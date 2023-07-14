

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

interface IProps {
    products: IProduct[],
    addProduct: () => void,
}

export default function Catalog({products, addProduct}: IProps) {
    return (
        <>
            <ul>
                {products.map(product => {
                return (
                    <li>{product.name}</li>
                )
                })}
            </ul>
            <button onClick={addProduct}>Add Product</button>
        </>
    )
}