import { Inter } from "next/font/google";
import "./globals.scss";
import classnames from "classnames";
import Header from "../components/Header/Header";
import Providers from "@/store/Providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={classnames("bg-black text-white", inter.className)}>
        <Header />
        <Providers>
          <main className="container">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
