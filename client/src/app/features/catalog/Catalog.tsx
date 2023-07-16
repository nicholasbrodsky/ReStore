import { IProduct } from "../../models/product";
import { Button } from "@mui/material";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

function Catalog() {
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
        <>
            <ProductList
                products={products} />
            <Button
                variant="contained"
                onClick={addProduct}>Add Product</Button>
        </>
    )
}

export default Catalog;
