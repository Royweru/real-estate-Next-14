# Apartimenti - Real Estate Management Platform

## Architecture Overview
Apartimenti is a monolithic full-stack application built on Next.js 14 utilizing the App Router. It serves as a dual-purpose platform handling public-facing property browsing and authenticated administrative/agent dashboards for inventory and lead management.

### Tech Stack
* **Framework:** Next.js 14.2.23 (React 18)
* **Database ORM:** Prisma 6.3.1
* **Authentication:** NextAuth.js v5 (Beta) utilizing JWT strategy and Credentials/OAuth providers.
* **Styling & UI:** Tailwind CSS, Radix UI primitives, Relume UI components.
* **File Storage:** Cloudinary (via `next-cloudinary`) and AWS S3 infrastructure.
* **Email:** Resend.
* **Validation:** Zod schemas.

### Directory Structure
* `/app/(authentication)`: Authentication flows (Sign-in, Sign-up, Verification).
* `/app/(manager)`: Protected dashboard routes for Agents and Admins.
* `/app/(publicroutes)`: Unauthenticated client-facing pages (Home, Browse, View Listing).
* `/features/*`: Domain-driven modular components (auth, inquiries, listings).
* `/actions`: Server actions for data mutation and fetching.
* `/lib`: Core utilities (Prisma client singleton, mailer, token generation).

### Local Environment Setup
1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Environment Variables (`.env`):**
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/apartimenti"
    DATABASE_URL_UNPOOLED="postgresql://user:password@localhost:5432/apartimenti"
    AUTH_SECRET="generate-via-openssl"
    RESEND_API_KEY="your-resend-key"
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
    ```
3.  **Database Initialization:**
    ```bash
    npx prisma db push
    npm run seed
    ```
4.  **Run Development Server:**
    ```bash
    npm run dev
    ```
