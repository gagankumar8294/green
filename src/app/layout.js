import Navbar from "../../components/Navbar";
import { ThemeProvider } from "../../context/ThemeContext";
import ThemeToggle from "../../components/ToggleTheme";
import AuthProvider from "../../context/AuthContex";
import './globals.css'
import SecondaryNav from "../../components/SecondaryNav";
import Breadcrumb from "../../components/Breadcrumb";
import { CartProvider } from "../../context/CartContext";
import Footer from "../../components/footer/Footer";
import WhatsAppFloat from "../../components/WhatsAppFloating/WhatsAppFloat";

export const metadata = {
  title: {
    default: "Happy Greenery | Buy Plants Online in Bangalore | Delivery Across India",
    template: "%s | Happy Greenery",
  },
  description:
    "Happy Greenery is an online plant nursery in Bangalore offering healthy indoor & outdoor plants with fast delivery.",

  metadataBase: new URL("https://www.happygreenery.in"),

  openGraph: {
    siteName: "Happy Greenery",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
  },

  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <CartProvider>
              <Navbar />
              <SecondaryNav />
              <Breadcrumb />
              {children}
              <WhatsAppFloat />
              <Footer />
              <ThemeToggle />
            </CartProvider>
          </ThemeProvider>
        </AuthProvider>
        
      </body>
    </html>
  );
}
