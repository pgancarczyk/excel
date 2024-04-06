import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Excel editor",
  description: "Allows to upload, edit and store Excel files privately",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-200 text-gray-800 overscroll-none h-screen overflow-y-hidden">
        {children}
      </body>
    </html>
  );
}
