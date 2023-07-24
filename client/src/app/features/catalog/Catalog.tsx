import { IProduct } from "../../models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import agent from "../../agent";

function Catalog() {
    const [products, setProducts] = useState<IProduct[]>([])
  
    useEffect(() => {
      agent.Catalog.list().then(products => setProducts(products))
    }, []); // empty array dependency means this hook is only called once when component mounts (would otherwise run everytime the commponent rerenders)

    return (
        <>
          <ProductList
              products={products} />
        </>
    )
}

export default Catalog;
