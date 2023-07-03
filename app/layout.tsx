import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Providers from "@/lib/Providers";
import ClientToast from "@/lib/ClientToast";
import Navigation from "@/components/Navigation/Navigation";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/react";
import OfflineBadge from "@/components/offline-badge/OfflineBadge";
import Hotjar from "@/lib/Hotjar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Leafbase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");

  return (
    <html lang="en" className={theme?.value === "dark" ? "dark" : ""}>
      <body
        className={`${inter.className} dark:bg-black dark:text-white ${
          theme?.value === "dark" && "dark"
        }`}
      >
        <Providers>
          <Navigation />
          <div className="pt-20">
            {children}
            <ClientToast />
            <OfflineBadge />
          </div>
          <Analytics />
          <Hotjar />
        </Providers>
      </body>
    </html>
  );
}
