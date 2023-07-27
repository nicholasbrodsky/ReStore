import { Card, CardMedia, CardContent, Typography, Button, CardActions } from "@mui/material";
import { IProduct } from "../../models/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../agent";

interface IProps {
    product: IProduct,
}

export default function ProductCard({product}: IProps) {

    const [loading, setLoading] = useState<boolean>(false);

    function handleAddItemToBasket() {
        setLoading(true);
        agent.Basket.addBasket(product.id!, 1)
            .catch(() => console.log("error adding item to basket"))
            .finally(() => setLoading(false));
    }

    return (
        <Card>
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain' }}
                image={product.pictureUrl}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions>
                {loading ? 
                    <Button>Loading...</Button> :
                    <Button onClick={handleAddItemToBasket} size="small">Add to Cart</Button>}
                <Button size="small" component={Link} to={`/catalog/${product.id}`}>Learn More</Button>
                {/* <Link to={"/catalog/" + product.id}>Learn More</Link> */}
            </CardActions>
        </Card>
    )
}
