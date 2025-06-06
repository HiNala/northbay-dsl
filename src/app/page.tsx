import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Next.js Full Stack Starter
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            A modern web application built with Next.js, TypeScript, Tailwind CSS, Prisma, and Supabase
          </p>
        </div>

        {/* Technology Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Next.js Card */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <Image
                src="/next.svg"
                alt="Next.js"
                width={40}
                height={40}
                className="dark:invert"
              />
              <h3 className="text-xl font-semibold ml-3 text-slate-900 dark:text-white">
                Next.js 15
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Latest stable version with App Router, Server Components, and excellent developer experience.
            </p>
          </div>

          {/* TypeScript Card */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">TS</span>
              </div>
              <h3 className="text-xl font-semibold ml-3 text-slate-900 dark:text-white">
                TypeScript
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Full type safety throughout the application with excellent IntelliSense support.
            </p>
          </div>

          {/* Tailwind CSS Card */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TW</span>
              </div>
              <h3 className="text-xl font-semibold ml-3 text-slate-900 dark:text-white">
                Tailwind CSS
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Utility-first CSS framework for rapid UI development with consistent design.
            </p>
          </div>

          {/* Prisma Card */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PR</span>
              </div>
              <h3 className="text-xl font-semibold ml-3 text-slate-900 dark:text-white">
                Prisma ORM
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Type-safe database client with excellent developer experience and auto-completion.
            </p>
          </div>

          {/* Supabase Card */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SB</span>
              </div>
              <h3 className="text-xl font-semibold ml-3 text-slate-900 dark:text-white">
                Supabase
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Open-source Firebase alternative with PostgreSQL, authentication, and real-time features.
            </p>
          </div>

          {/* Development Card */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DX</span>
              </div>
              <h3 className="text-xl font-semibold ml-3 text-slate-900 dark:text-white">
                Developer Experience
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Hot reload, ESLint, and optimized build tools for the best development experience.
            </p>
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Getting Started
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Configure Supabase
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Update the <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm">.env</code> file with your Supabase project credentials.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Run Database Migrations
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Execute <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm">npx prisma db push</code> to create your database tables.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Start Building
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Begin building your application with all the tools configured and ready to go!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-slate-600 dark:text-slate-400">
            Built with ❤️ using modern web technologies
          </p>
        </div>
      </div>
    </div>
  );
} 