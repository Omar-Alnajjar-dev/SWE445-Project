import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";


export const metadata: Metadata = {
  title: "SWE445 Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen flex justify-center items-center p-24">
        <div className="fixed top-0 left-0">
          <Navbar />
        </div>

        {children}

      </body>
    </html>
  );
}
