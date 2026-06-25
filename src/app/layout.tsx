import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "TechForge ERP - نظام إدارة مركز التكنولوجيا و FabLab",
  description: "نظام إدارة شامل ومتكامل لمركز تدريس الروبوتيك والإلكترونيات وخدمات التصنيع الرقمي FabLab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
