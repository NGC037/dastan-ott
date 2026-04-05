"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <LayoutWrapper>{children}</LayoutWrapper>
        </QueryClientProvider>
      </body>
    </html>
  );
}
