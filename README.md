# 🏗️ Beaver Builders

> A modern, professional website for **Beaver Builders**, a Maldives-based construction and development company.

The website is designed to present Beaver Builders' projects, services, company information, and contact details through a clean, premium, and responsive user experience.

---

## 🚀 Technology Stack

* ⚛️ **Next.js** — React framework with App Router
* 🔷 **TypeScript** — Type-safe development
* 🎨 **Tailwind CSS** — Modern responsive styling
* ✨ **Canvas / JavaScript** — Custom hero animation
* 🗄️ **Supabase** — Database, authentication & storage
* 📧 **Resend** — Contact and enquiry emails
* 🛡️ **Cloudflare Turnstile** — Spam and bot protection
* ▲ **Vercel** — Hosting and deployment
* 🐙 **GitHub** — Source control and collaboration

---

## ✨ Features

* 📱 Fully responsive design
* 🏢 Premium construction-company focused UI
* 🎬 Custom animated hero section
* 🏗️ Project showcase and portfolio
* 🔎 Project categories and filtering
* 📄 Individual project detail pages
* 🖼️ Optimized project imagery
* 📩 Contact and enquiry forms
* ⚡ Performance-focused implementation
* 🔍 SEO-friendly page structure
* 📱 Mobile, tablet and desktop support
* 🛠️ Simple project content management

---

## 🏗️ Project Management

Projects are the main content area that will be updated regularly.

An internal project management interface will allow authorized users to:

* ➕ Add new projects
* ✏️ Edit existing projects
* 🔄 Update project status
* 📝 Update project descriptions and details
* 🖼️ Upload and manage project images
* ⭐ Mark projects as featured
* 📍 Manage project location and information

Project content will be stored in **Supabase**, allowing project updates without modifying the website's frontend code.

---

## 📁 Project Structure

```text
beaver-builders/
│
├── app/                  # Next.js application
│   ├── page.tsx          # Homepage
│   ├── layout.tsx        # Root layout
│   └── ...
│
├── public/               # Static assets
│
├── package.json          # Dependencies and scripts
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
├── eslint.config.mjs     # ESLint configuration
├── postcss.config.mjs    # PostCSS configuration
└── README.md             # Project documentation
```

---

## 🛠️ Development

### Requirements

* Node.js 18+
* npm
* Git

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

---

## 🔐 Environment Variables

Environment-specific configuration should be stored in:

```text
.env.local
```

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

> ⚠️ Never commit API keys, passwords, tokens, or other secrets to GitHub.

---

## ☁️ Deployment

The website will be deployed using **Vercel**.

### Deployment Flow

```text
GitHub
   ↓
Vercel
   ↓
Next.js Application
   ↓
Supabase
   ↓
Production Website
```

The existing Beaver Builders domain will be connected to the new production deployment after the website has been fully tested and approved.

---

## 🌐 Production Domain

**Current domain:**

```text
beaver.mv
```

The existing WordPress website will remain untouched during development.

The domain will be migrated to the new Next.js website only after:

* ✅ Development is complete
* ✅ All pages are tested
* ✅ Projects are verified
* ✅ Mobile responsiveness is checked
* ✅ Forms and email delivery are tested
* ✅ Final approval is received

---

## 📌 Project Status

**🚧 In Development**

Current progress:

* ✅ Next.js project initialized
* ✅ TypeScript configured
* ✅ Tailwind CSS configured
* ✅ Git repository initialized
* 🔄 Existing website design migration
* 🔄 Hero animation migration
* ⏳ Project management system
* ⏳ Supabase integration
* ⏳ Contact/enquiry system
* ⏳ Production deployment

---

## 🎯 Development Goals

The new website aims to provide:

**🏢 Professional Design**
A premium visual identity suitable for a modern construction and development company.

**⚡ Smooth Performance**
Fast page loading, optimized images, and lightweight frontend implementation.

**✨ Engaging Experience**
Smooth interactions and the existing custom hero animation as a key visual element.

**🛠️ Easy Management**
A simple internal system for updating projects without requiring frontend code changes.

**📱 Responsive Experience**
A consistent experience across desktop, tablet, and mobile devices.

---

## 🔒 License

This project is proprietary software developed for **Beaver Builders**.

Unauthorized copying, redistribution, or reuse of the source code and design is not permitted without permission from the project owner.
