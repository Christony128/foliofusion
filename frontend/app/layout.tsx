import "./globals.css";
import Header from "./components/Header";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Foliofusion | Instant Resume builder for developers</title>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
