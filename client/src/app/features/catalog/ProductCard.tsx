import { Card, CardMedia, CardContent, Typography, Button, CardActions } from "@mui/material";
import { IProduct } from "../../models/product";
import { Link, NavLink } from "react-router-dom";

interface IProps {
    product: IProduct,
}

export default function ProductCard({product}: IProps) {
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
                <Button size="small">Share</Button>
                <Button size="small" component={Link} to={`/catalog/${product.id}`}>Learn More</Button>
                {/* <Link to={"/catalog/" + product.id}>Learn More</Link> */}
            </CardActions>
        </Card>
    )
}
