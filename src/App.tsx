import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Archive } from "./components/Archive";
import { FieldNotes } from "./components/FieldNotes";
import { Culture } from "./components/Culture";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";

export default function App() {
  return (
    <div className="bg-ink min-h-screen">
      <Header />
      <main>
        <Hero />
        <Archive />
        <FieldNotes />
        <Culture />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
