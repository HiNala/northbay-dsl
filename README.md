# Next.js Full Stack Starter

A modern, production-ready full-stack web application built with the latest technologies:

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Prisma** - Type-safe database ORM
- **Supabase** - PostgreSQL database and backend services

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Supabase account

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

1. Copy the `.env` file and update it with your Supabase credentials:

```bash
# Get these values from your Supabase project dashboard
DATABASE_URL="postgresql://postgres:[YOUR_PASSWORD]@db.[YOUR_PROJECT_REF].supabase.co:5432/postgres?schema=public"

# Optional: For Supabase Auth/Storage (if needed later)
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR_PROJECT_REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR_ANON_KEY]"

# NextAuth Secret (generate a random string)
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Database Setup

Push the database schema to your Supabase database:

```bash
npm run db:push
```

Generate the Prisma client:

```bash
npm run db:generate
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   └── lib/
│       └── prisma.ts        # Prisma client configuration
├── prisma/
│   └── schema.prisma        # Database schema
├── public/                  # Static assets
├── .env                     # Environment variables
└── package.json
```

## 🗄️ Database

The project includes example models in `prisma/schema.prisma`:

- **User** - Basic user model with id, email, name
- **Post** - Blog post model with relation to User

### Useful Database Commands

```bash
# Push schema changes to database
npm run db:push

# Generate Prisma client after schema changes
npm run db:generate

# Open Prisma Studio (database GUI)
npm run db:studio

# Create and run migrations
npm run db:migrate

# Pull schema from existing database
npm run db:pull
```

## 🎨 Styling

This project uses **Tailwind CSS** for styling. The configuration supports:

- Dark mode
- Responsive design
- Custom color schemes
- Typography utilities

## 🔧 Development

### Adding New Database Models

1. Update `prisma/schema.prisma`
2. Run `npm run db:push` to apply changes
3. Run `npm run db:generate` to update the Prisma client

### Using the Database

Import and use the Prisma client in your components:

```typescript
import { prisma } from '@/lib/prisma'

// Example: Fetch all users
const users = await prisma.user.findMany()

// Example: Create a new user
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    name: 'John Doe'
  }
})
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:pull` - Pull schema from database
- `npm run db:migrate` - Create and run migrations
- `npm run db:studio` - Open Prisma Studio

## 🚀 Deployment

This app can be deployed on various platforms:

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app is compatible with any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you have any questions or run into issues:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Visit the [Prisma documentation](https://www.prisma.io/docs/)
3. Read the [Supabase documentation](https://supabase.com/docs)
4. Open an issue in this repository

---

Built with ❤️ using modern web technologies
