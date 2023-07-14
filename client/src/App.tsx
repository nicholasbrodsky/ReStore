import { useEffect, useState } from "react";
import Catalog from "./Catalog";

interface IProduct {
  id?: number,
  name: string,
  description?: string,
  price: number,
  pictureUrl?: string,
  type?: string,
  brand?: string,
  quantityInStock?: number,
}

function App() {

  const [products, setProduct] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(response => response.json())
      .then(data => setProduct(data));
  }, []);

  function addProduct() {
    setProduct((prevState) => [...prevState, {name: 'one', price: 300}]);
  }

  return (
    <div>
      <h1>Re-Store</h1>
      <Catalog
        products={products}
        addProduct={addProduct} />
    </div>
  );
}

export default App;
