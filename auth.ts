import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        const result = await pool.query(
          "SELECT id, email, password_hash, studio_name FROM for_designers.designers WHERE email = $1",
          [email]
        );

        const user = result.rows[0];

        if (!user || !user.password_hash) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password_hash);

        if (passwordsMatch) {
          return {
            id: user.id,
            email: user.email,
            name: user.studio_name,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const result = await pool.query(
          "SELECT id FROM for_designers.designers WHERE email = $1",
          [user.email]
        );
        
        if (result.rows.length === 0) {
          // If no user exists, create a new one using Google data
          const studioName = user.name || "My Studio";
          // We generate a dummy random password since Google login doesn't have one
          const dummyHash = await bcrypt.hash(Math.random().toString(), 10);
          
          await pool.query(
            "INSERT INTO for_designers.designers (email, password_hash, studio_name) VALUES ($1, $2, $3)",
            [user.email, dummyHash, studioName]
          );
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        
        // Make sure Google users have their DB id
        if (account?.provider === "google") {
          const result = await pool.query(
            "SELECT id FROM for_designers.designers WHERE email = $1",
            [user.email]
          );
          if (result.rows[0]) {
            token.id = result.rows[0].id;
          }
        }
      }
      
      // Always attach role designers
      token.role = "designers";

      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      
      // Add role to the session
      if (token?.role) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
