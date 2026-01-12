import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pet Registration Demo | better-form',
  description: 'Register your furry friend with our fun multi-step wizard powered by better-form',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <main className="min-h-screen py-8 px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <header className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-4">
                <span className="text-sm font-medium text-gray-600">Powered by</span>
                <span className="text-sm font-bold text-pink-500">better-form</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
                Registra il tuo
                <span className="block bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent">
                  Amico Peloso!
                </span>
              </h1>
              <p className="text-gray-500 text-lg">
                Compila il form per registrare il tuo animale domestico
              </p>
            </header>

            {/* Main content */}
            {children}

            {/* Footer */}
            <footer className="mt-12 text-center text-sm text-gray-400">
              <p>
                Demo creato con{' '}
                <a
                  href="https://github.com/GrandeVx/better-form"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:underline font-medium"
                >
                  @better_form/core
                </a>
              </p>
            </footer>
          </div>
        </main>
      </body>
    </html>
  );
}
