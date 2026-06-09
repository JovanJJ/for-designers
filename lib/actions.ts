"use server";

import { auth } from "@/auth";
import { Pool } from "pg";
import crypto from "crypto";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function createProjectAction({
  projectName,
  clientEmail,
  clientNotes,
  selectedRooms,
}: {
  projectName: string;
  clientEmail: string;
  clientNotes: string;
  selectedRooms: string[];
}) {
  const session = await auth();

  // @ts-ignore - Assuming role is attached to user from previous auth implementation
  if (!session || !session.user || session.user.role !== "designers") {
    return { success: false, error: "Unauthorized" };
  }

  const designerId = session.user.id;
  
  if (!designerId) {
    return { success: false, error: "Unauthorized" };
  }

  const shareToken = crypto.randomUUID();

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Insert into for_designers.projects
    const projectInsertResult = await client.query(
      `INSERT INTO for_designers.projects (designer_id, name, client_email, client_notes, share_token, status) 
       VALUES ($1, $2, $3, $4, $5, 'LINK_SENT') RETURNING id`,
      [designerId, projectName, clientEmail, clientNotes, shareToken]
    );

    const projectId = projectInsertResult.rows[0].id;

    // Insert rooms
    for (const room of selectedRooms) {
      await client.query(
        `INSERT INTO for_designers.rooms (project_id, room_type, status) VALUES ($1, $2, 'PENDING')`,
        [projectId, room]
      );
    }

    await client.query("COMMIT");

    return { success: true, shareUrl: `/intake/${shareToken}` };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Failed to create project:", error);
    return { success: false, error: "Failed to create project" };
  } finally {
    client.release();
  }
}

export async function getDesignerProjects() {
  const session = await auth();

  // Validate the user exists and has the correct designer role
  if (!session || !session.user || (session.user as any).role !== "designers") {
    throw new Error("Unauthorized");
  }

  const designerId = session.user.id;
  
  if (!designerId) {
    throw new Error("Unauthorized");
  }

  const client = await pool.connect();

  try {
    const query = `
      SELECT 
        p.id,
        p.name,
        p.status,
        p.client_email,
        p.client_notes,
        p.created_at,
        p.share_token,
        COALESCE(
          json_agg(r.room_type) FILTER (WHERE r.room_type IS NOT NULL),
          '[]'
        ) as rooms
      FROM for_designers.projects p
      LEFT JOIN for_designers.rooms r ON p.id = r.project_id
      WHERE p.designer_id = $1
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `;

    const result = await client.query(query, [designerId]);
    return result.rows;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    throw new Error("Failed to fetch projects");
  } finally {
    client.release();
  }
}

export async function saveRoomDataAction(payload: {
  roomId: string;
  length: number | string;
  width: number | string;
  height: number | string;
  clientFeedback?: string;
  skippedFeatures?: string[] | Record<string, boolean>;
  images: { category: string; data: string }[];
}) {
  const { roomId, clientFeedback, skippedFeatures, images } = payload;

  const parsedLength = parseFloat(String(payload.length));
  const parsedWidth = parseFloat(String(payload.width));
  const parsedHeight = parseFloat(String(payload.height));

  const finalLength = isNaN(parsedLength) ? null : parsedLength;
  const finalWidth = isNaN(parsedWidth) ? null : parsedWidth;
  const finalHeight = isNaN(parsedHeight) ? null : parsedHeight;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Fetch Project ID Context Dynamically
    const projectResult = await client.query(
      `SELECT project_id FROM for_designers.rooms WHERE id = $1`,
      [roomId]
    );

    if (projectResult.rows.length === 0) {
      throw new Error("Room not found");
    }

    const projectId = projectResult.rows[0].project_id;

    // 2. Strict Numeric Update for Room Data
    await client.query(
      `UPDATE for_designers.rooms 
       SET length = $1, 
           width = $2, 
           height = $3, 
           client_feedback = $4, 
           status = 'COMPLETED'
       WHERE id = $5`,
      [finalLength, finalWidth, finalHeight, clientFeedback || null, roomId]
    );

    // 3. Reliable Cloudinary Upload Pipeline
    for (const image of images) {
      let dbLabel = image.category;
      
      // Map universal labels directly into Postgres driver
      if (image.category === 'corners') {
        dbLabel = 'Room Corners (4 Views)';
      } else if (image.category === 'sockets') {
        dbLabel = 'Switches and Electrical Outlets';
      } else if (image.category === 'radiators') {
        dbLabel = 'Radiators and Heating Pipes';
      } else if (image.category === 'kitchen_drainage') {
        dbLabel = 'Water Drainage & Ventilation';
      } else if (image.category === 'bathroom_plumbing') {
        dbLabel = 'Plumbing & Drainage';
      }

      const uploadResponse = await cloudinary.uploader.upload(image.data, {
        folder: `space_intake_production/project_${projectId}/room_${roomId}`,
        resource_type: 'auto',
        transformation: [{ width: 2000, crop: 'limit', quality: 'auto' }]
      });

      await client.query(
        `INSERT INTO for_designers.room_assets (room_id, image_url, label) VALUES ($1, $2, $3)`,
        [roomId, uploadResponse.secure_url, dbLabel]
      );
    }

    // 4. Project Status Auto-Update Evaluator
    const allRoomsResult = await client.query(
      `SELECT COUNT(*) as total, SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) as completed 
       FROM for_designers.rooms 
       WHERE project_id = $1`,
      [projectId]
    );

    const total = Number(allRoomsResult.rows[0].total);
    const completed = Number(allRoomsResult.rows[0].completed);

    if (total === completed && total > 0) {
      await client.query(
        `UPDATE for_designers.projects SET status = 'READY_TO_REVIEW' WHERE id = $1`,
        [projectId]
      );
    } else {
      await client.query(
        `UPDATE for_designers.projects SET status = 'CLIENT_UPLOADING' WHERE id = $1`,
        [projectId]
      );
    }

    await client.query("COMMIT");
    return { success: true };
  } catch (error: any) {
    await client.query("ROLLBACK");
    console.error("saveRoomDataAction error detailed:", {
      message: error.message,
      stack: error.stack,
      roomId,
      imageCount: images?.length
    });
    return { success: false, error: "Failed to process and save room assets: " + error.message };
  } finally {
    client.release();
  }
}

export async function getIntakeDataByToken(token: string) {
  try {
    // 1. Fetch project and designer branding
    const projectQuery = `
      SELECT 
        p.id, 
        p.name as project_name, 
        p.client_notes, 
        d.studio_name,
        d.brand_color,
        d.logo_url
      FROM for_designers.projects p
      INNER JOIN for_designers.designers d ON p.designer_id = d.id
      WHERE p.share_token = $1
      LIMIT 1
    `;
    const projectResult = await pool.query(projectQuery, [token]);

    if (projectResult.rows.length === 0) {
      return null;
    }

    const project = projectResult.rows[0];

    // 2. Fetch rooms for this project
    const roomsQuery = `
      SELECT 
        id, 
        room_type, 
        status
      FROM for_designers.rooms
      WHERE project_id = $1
      ORDER BY created_at ASC
    `;
    const roomsResult = await pool.query(roomsQuery, [project.id]);

    return {
      project: {
        id: project.id,
        name: project.project_name,
        clientNotes: project.client_notes,
        studioName: project.studio_name,
        brandColor: project.brand_color,
        logoUrl: project.logo_url,
        isPremium: !!(project.brand_color || project.logo_url)
      },
      rooms: roomsResult.rows.map(row => ({
        id: row.id,
        roomType: row.room_type,
        status: row.status
      }))
    };
  } catch (error) {
    console.error("getIntakeDataByToken error:", error);
    return null;
  }
}
