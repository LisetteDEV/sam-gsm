import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Categories from "./components/Categories";
import PopularProducts from "./components/PopularProducts";
import WhyUs from "./components/WhyUs";
import Reviews from "./components/Reviews";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import APropos from "./pages/Apropos";
import Telephones from "./pages/Telephones";
import Accessoires from "./pages/Accessoires";
import Offres from "./pages/Offres";
import ProductDetail from "./pages/ProductDetail";
import CartDrawer from "./components/CartDrawer";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";



function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Categories />
      <PopularProducts />
      <WhyUs />
      <Reviews />
      <Newsletter />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Navbar />
        <CartDrawer />

        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/telephones"  element={<Telephones />} />
          <Route path="/accessoires" element={<Accessoires />} />
          <Route path="/offres"      element={<Offres />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />


        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

