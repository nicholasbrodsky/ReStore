import { Fragment } from "react";
import { IProduct } from "../../models/product";

interface IProps {
    products: IProduct[],
    addProduct: () => void,
}

function Catalog({products, addProduct}: IProps) {
    return (
        <>
            <ul>
                {products.map((product, index) => {
                return (
                    <li key={index}>{product.name}</li>
                )
                })}
            </ul>
            <button onClick={addProduct}>Add Product</button>
        </>
    )
}

export default Catalog;
