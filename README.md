# Bookx Library

**Live Demo:** ([https://bubbly-q2bp.onrender.com](https://bookx-library.vercel.app/))  
Bookx Library is a full-stack web application for managing book lending in a university or institutional setting. It supports user authentication, borrowing logic, admin controls, and automated workflows for notifications.

## Features

- Secure user authentication using NextAuth.js with bcrypt-encrypted credentials
- Role-based admin dashboard with access to user stats, book inventory, and borrowing analytics
- Book listing, borrowing, and availability tracking for users
- Automated email workflows using Resend and Upstash Workflow for due date reminders and status updates
- API rate limiting and caching with Upstash Redis and Ratelimit
- Image upload integration via ImageKit
- Clean, accessible, and responsive UI built with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: App Router (Next.js), Drizzle ORM, Neon PostgreSQL
- **Authentication**: Auth.js + bcryptjs
- **Image Management**: ImageKit
- **Workflows**: Upstash Workflow + Resend
- **Rate Limiting & Caching**: Upstash Redis, Ratelimit
- **Validation & Forms**: Zod, React Hook Form

## Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/bookx-library.git
   cd bookx-library
   npm install

2. **ENV Keys**

### Environment Variables

#### ImageKit

NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=


#### API Configuration


NEXT_PUBLIC_API_ENDPOINT=http://localhost:3000
NEXT_PROD_API_ENDPOINT=


#### Database

DATABASE_URL=


#### Authentication

AUTH_SECRET=


#### Upstash Redis

UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=


#### Upstash Workflow

QSTASH_URL=https://qstash.upstash.io
QSTASH_TOKEN=
RESEND_WORKFLOW=
