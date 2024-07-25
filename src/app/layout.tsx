import StoreProvider from "@/redux/features/StoreProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Redux Todo app",
  description: "This Todo app uses Redux to manage the state",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("bg-slate-50", inter.className)}>
        <StoreProvider>
          <div className="max-w-7xl mx-auto px-2 py-10 h-full bg-slate-50 dark:bg-slate-900 w-full text-slate-900 dark:text-slate-300">
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
