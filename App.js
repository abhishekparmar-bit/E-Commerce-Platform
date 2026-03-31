import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;