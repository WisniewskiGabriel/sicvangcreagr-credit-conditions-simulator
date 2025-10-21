import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import { AuthProvider } from "./context/AuthContext";
import { PrimeReactProvider } from "primereact/api";

export const metadata: Metadata = {
  title: "Protótipo SICVANGCREAGR",
  description: "SICVANGCREAGR - Crédito agrícola",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <PrimeReactProvider>
          <ThemeProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ThemeProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
