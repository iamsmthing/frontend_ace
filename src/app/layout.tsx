import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "../components/theme-provider";
import { MainNav } from "../components/main-nav";
import { AuthProvider } from '../contexts/auth-context';
import { Toaster } from '../components/ui/sonner';
import { Footer } from '../components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Frontend ACE',
  description: 'Practice frontend development with interactive coding challenges',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <Toaster richColors position="top-right" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <AuthProvider>
            <MainNav />
            {children}
            </AuthProvider>
          </div>
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}