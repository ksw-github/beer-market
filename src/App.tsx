import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import Cart from "./pages/cart";
import "./styles/global.scss";
import { CartProvider } from "./components/cartitem";
import { URL } from "./router/constants";

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path={URL} element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
