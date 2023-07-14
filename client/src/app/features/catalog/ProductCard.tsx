import { Card, CardMedia, CardContent, Typography, Button, CardActions } from "@mui/material";
import { IProduct } from "../../models/product";

interface IProps {
    product: IProduct,
}

export default function ProductCard({product}: IProps) {
    return (
        <Card>
            <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
    </Card>
    )
}
