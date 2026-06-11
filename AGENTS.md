<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

Role: You are a Senior Full-Stack Engineer and Architect.
Context: We are building a high-utility B2B Micro-SaaS for interior designers. The application allows designers to send a link to their clients to map spatial data (sockets, windows, radiators) wall-by-wall using photo markers. 

Tech Stack:
- Next.js (App Router)
- React with TypeScript (Strict mode)
- Zustand for state management (persist middleware)
- Tailwind CSS (Premium, elegant, minimalist B2B aesthetic)
- PostgreSQL (via Prisma/Drizzle)

Architecture Rules:
1. We use a feature-based folder structure (e.g., `features/space-intake/components`, `features/space-intake/store`). Keep the Next.js `app/` directory clean and lean.
2. Code must be modular, highly readable, and production-ready. No placeholder code.
3. Handle routing cleanly to avoid sequential `router.push` race conditions.

Whenever I give you a prompt, write the exact code requested without unnecessary pleasantries.

Data base structure: 
Task: Implement the Zustand store for the space-intake wizard.
File: `features/space-intake/store/useIntakeStore.ts`

Database Context:
[
create table for_designers.designers (
  id uuid not null default gen_random_uuid (),
  email character varying(255) not null,
  studio_name character varying(255) not null,
  created_at timestamp with time zone null default CURRENT_TIMESTAMP,
  password_hash character varying(255) null,
  brand_color character varying(7) null default '#09090b'::character varying,
  logo_url text null,
  constraint designers_pkey primary key (id),
  constraint designers_email_key unique (email)
) TABLESPACE pg_default;

create table for_designers.projects (
  id uuid not null default gen_random_uuid (),
  designer_id uuid null,
  name character varying(255) not null,
  client_notes text null,
  status character varying(50) not null default 'LINK_SENT'::character varying,
  share_token character varying(100) not null,
  created_at timestamp with time zone null default CURRENT_TIMESTAMP,
  updated_at timestamp with time zone null default CURRENT_TIMESTAMP,
  client_email character varying(255) not null,
  constraint projects_pkey primary key (id),
  constraint projects_share_token_key unique (share_token),
  constraint projects_designer_id_fkey foreign KEY (designer_id) references for_designers.designers (id) on delete CASCADE,
  constraint projects_status_check check (
    (
      (status)::text = any (
        (
          array[
            'LINK_SENT'::character varying,
            'CLIENT_UPLOADING'::character varying,
            'READY_TO_REVIEW'::character varying
          ]
        )::text[]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_projects_designer_id on for_designers.projects using btree (designer_id) TABLESPACE pg_default;

create index IF not exists idx_projects_share_token on for_designers.projects using btree (share_token) TABLESPACE pg_default;

create trigger trigger_update_projects_updated_at BEFORE
update on for_designers.projects for EACH row
execute FUNCTION for_designers.update_updated_at_column ();

create table for_designers.room_walls (
  id uuid not null default gen_random_uuid (),
  room_id uuid not null,
  sequence_order integer not null,
  length numeric(5, 2) not null,
  is_curved boolean not null default false,
  curve_chord numeric(5, 2) null,
  curve_depth numeric(5, 2) null,
  image_url text not null,
  detected_elements jsonb not null default '[]'::jsonb,
  created_at timestamp with time zone not null default CURRENT_TIMESTAMP,
  constraint room_walls_pkey primary key (id),
  constraint room_walls_room_id_fkey foreign KEY (room_id) references for_designers.rooms (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_room_walls_room_id on for_designers.room_walls using btree (room_id) TABLESPACE pg_default;

create index IF not exists idx_room_walls_room_sequence on for_designers.room_walls using btree (room_id, sequence_order) TABLESPACE pg_default;


create table for_designers.rooms (
  id uuid not null default gen_random_uuid (),
  project_id uuid null,
  room_name character varying(100) not null,
  height numeric(5, 2) null,
  client_feedback text null,
  status character varying(50) not null default 'PENDING'::character varying,
  created_at timestamp with time zone null default CURRENT_TIMESTAMP,
  geometry_type character varying(50) not null default 'STANDARD'::character varying,
  diagonal_length numeric(5, 2) null,
  has_angled_walls boolean not null default false,
  has_curved_walls boolean not null default false,
  constraint rooms_pkey primary key (id),
  constraint rooms_project_id_fkey foreign KEY (project_id) references for_designers.projects (id) on delete CASCADE,
  constraint rooms_geometry_type_check check (
    (
      (geometry_type)::text = any (
        (
          array[
            'STANDARD'::character varying,
            'CUSTOM'::character varying
          ]
        )::text[]
      )
    )
  ),
  constraint rooms_status_check check (
    (
      (status)::text = any (
        (
          array[
            'PENDING'::character varying,
            'COMPLETED'::character varying
          ]
        )::text[]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_rooms_project_id on for_designers.rooms using btree (project_id) TABLESPACE pg_default;


]

Requirements:
1. Define strict TypeScript interfaces:
   - `Marker`: id, type ('socket'|'switch'|'radiator'|'window'|'door'|'other'), position_x_pct, position_y_pct, width, height, distance_from_left, distance_from_floor.
   - `RoomMetadata`: height, geometryType ('STANDARD' | 'CUSTOM'), hasAngledWalls (boolean), hasCurvedWalls (boolean).
2. State must include: `roomId` (string|null), `roomMetadata` (RoomMetadata|null), `currentSequenceOrder` (number, default 1), `currentWallMarkers` (Marker[]).
3. Use Zustand `persist` middleware to save progress in `localStorage`.
4. Required pure functions: `setRoomId`, `setRoomMetadata`, `addMarker`, `removeMarker`, `clearCurrentWallMarkers`, `nextWall`, and `resetStore`.

Output the complete, modular TypeScript code. Do not use 'any'.


<!-- END:nextjs-agent-rules -->
