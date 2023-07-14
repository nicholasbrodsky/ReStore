import { IProduct } from "../../models/product";
import { Button } from "@mui/material";
import ProductList from "./ProductList";

interface IProps {
    products: IProduct[],
    addProduct: () => void,
}

function Catalog({products, addProduct}: IProps) {
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
