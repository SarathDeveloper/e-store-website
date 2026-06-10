import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: {
    default: "E-Store | Premium Fashion Online",
    template: "%s | E-Store"
  },
  description: "Experience premium custom tailoring in Medavakkam, Chennai. Specialists in bridal Aari work, designer blouses, and expert ethnic wear tailoring with doorstep pickup.",
  keywords: ["Ladies Tailor Medavakkam", "Blouse Stitching Medavakkam", "Aari Work Chennai", "Designer Blouses Medavakkam", "Tailoring Shop Chennai"],
  openGraph: {
    title: "E-Store | Premium Fashion Destination",
    description: "Expert custom tailoring for women in Medavakkam. Bridal work, blouses, and more.",
    images: ["/hero-tailor.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${lora.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
