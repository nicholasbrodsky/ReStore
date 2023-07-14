import { Fragment } from "react";
import { IProduct } from "../../models/product";
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

interface IProps {
    products: IProduct[],
    addProduct: () => void,
}

function Catalog({products, addProduct}: IProps) {
    return (
        <>
            <List>
                {products.map((product, index) => {
                return (
                    <ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar src={product.pictureUrl} />
                        </ListItemAvatar>
                        <ListItemText>
                            {product.name} - {product.price}
                        </ListItemText>
                    </ListItem>
                )
                })}
            </List>
            <Button
                variant="contained"
                onClick={addProduct}>Add Product</Button>
        </>
    )
}

export default Catalog;
