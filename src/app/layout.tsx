"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideSidebar = pathname.startsWith("/login") || pathname.startsWith("/registrar");

  return (
    <html lang="en">
      
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <SessionProvider>
            <SidebarProvider>
              {!hideSidebar && <AppSidebar />}
              {children}
              <Toaster />
            </SidebarProvider>
          </SessionProvider>
        </body>
      
    </html>
  );
}
