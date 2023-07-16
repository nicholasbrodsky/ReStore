import { Grid } from "@mui/material"
import { IProduct } from "../../models/product"
import ProductCard from "./ProductCard"

interface IProps {
    products: IProduct[],
}

export default function ProductList(props: IProps) {
    return (
        <Grid container spacing={4}>
            {props.products.map((product) => (
                    <Grid item xs={3} key={product.id}>
                        <ProductCard
                            product={product} />
                    </Grid>
                )
            )}
        </Grid>
    )
}
