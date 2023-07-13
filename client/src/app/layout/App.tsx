import { useEffect, useState } from "react";
import { IProduct } from "../models/product";
import Catalog from "../features/catalog/Catalog";

export default function App() {
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
    .then(resp => resp.json())
    .then(data => setProducts(data))
  }, []); // empty array dependency means this hook is only called once when component mounts (would otherwise run everytime the commponent rerenders)


  function addProduct() {
    // setProducts(prevState => [...prevState, {name: 'one', price: 100}]);
    setProducts([...products, {name: 'one', price: 100,}]);
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

// export default App;
