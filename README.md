# Bookx Library

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://bookx-library.vercel.app/)

A modern, full-stack library management system designed for universities and institutions. Bookx Library streamlines book lending operations with automated workflows, real-time analytics, and role-based access control.

**🔗 [View Live Demo](https://bookx-library.vercel.app/)**

---

## ✨ Features

### For Users
- 📚 **Browse & Borrow** – Search and borrow books with real-time availability tracking
- 🔔 **Smart Notifications** – Automated email reminders for due dates and return confirmations
- 📱 **Responsive Design** – Seamless experience across all devices

### For Administrators
- 📊 **Analytics Dashboard** – Comprehensive insights into borrowing patterns and inventory
- 👥 **User Management** – Control user access and monitor borrowing history
- 🔐 **Role-Based Access** – Secure, permission-based admin controls

### Technical Highlights
- 🔒 **Secure Authentication** – NextAuth.js with bcrypt-encrypted credentials
- ⚡ **Performance Optimized** – Redis caching and API rate limiting
- 🖼️ **Image Management** – Integrated ImageKit CDN for book covers
- 📧 **Automated Workflows** – Transactional emails via Resend and Upstash Workflow

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS, Shadcn/UI |
| **Backend** | Next.js App Router, Drizzle ORM, Neon PostgreSQL |
| **Authentication** | Auth.js (NextAuth.js), bcryptjs |
| **Infrastructure** | Upstash Redis, Upstash Workflow, ImageKit CDN |
| **Email & Notifications** | Resend |
| **Validation** | Zod, React Hook Form |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (or Neon account)
- Accounts for: Upstash, ImageKit, Resend

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Alsamri/bookx-library.git
   cd bookx-library
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL=your_neon_postgresql_connection_string
   
   # Authentication
   AUTH_SECRET=your_generated_secret
   
   # ImageKit CDN
   NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
   NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_public_key
   IMAGEKIT_PRIVATE_KEY=your_private_key
   
   # API Endpoints
   NEXT_PUBLIC_API_ENDPOINT=http://localhost:3000
   NEXT_PROD_API_ENDPOINT=https://your-production-url.com
   
   # Upstash Redis
   UPSTASH_REDIS_URL=your_redis_url
   UPSTASH_REDIS_TOKEN=your_redis_token
   
   # Upstash Workflow & Resend
   QSTASH_URL=https://qstash.upstash.io
   QSTASH_TOKEN=your_qstash_token
   RESEND_WORKFLOW=your_resend_api_key
   ```

   > 💡 **Tip:** Generate `AUTH_SECRET` with: `openssl rand -base64 32`

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐳 Docker Deployment

### Quick Start with Docker Compose

1. **Create `.env` file** (copy from `.env.local`)
   ```bash
   cp .env.local .env
   ```

2. **Build and run**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   ```
   http://localhost:3000
   ```

### Manual Docker Build

```bash
docker build -t bookx-library .
docker run -p 3000:3000 --env-file .env bookx-library
```

---

## 📁 Project Structure

```
bookx-library/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── (auth)/            # Authentication pages
│   └── (root)/            # Main application pages
├── components/            # React components
├── lib/                   # Utility functions and configs
├── public/                # Static assets
├── database/              # Database schema and migrations
└── types/                 # TypeScript type definitions
```

---

## 🔑 Key Functionality

### User Authentication
- Secure credential-based login with bcrypt encryption
- Session management via Auth.js
- Role-based permissions (User/Admin)

### Book Management
- CRUD operations for books and borrowing records
- Real-time availability tracking
- Search and filter capabilities

### Admin Dashboard
- User analytics and borrowing statistics
- Inventory management
- System-wide controls and monitoring

### Automated Workflows
- Due date reminder emails (3 days before)
- Return confirmation notifications
- Overdue alerts
