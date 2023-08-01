import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../../models/product";
import agent from "../../api/agent";
import { useStoreContext } from "../../context/StoreContext";
import { IBasket } from "../../models/basket";

export default function ProductDetails() {
    const { id } = useParams()
    const { basket, setBasket, removeItem } = useStoreContext();
    const [ quantity, setQuantity ] = useState<number>(0);
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingCart, setLoadingCart] = useState<boolean>(false);

    const item = basket?.basketItems.find(item => item.product.id === product?.id);
    
    useEffect(() => {
        if (item)
            setQuantity(item.quantity);
        id && agent.Catalog.details(id)
            .then((product: IProduct) => setProduct(product))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [id, item]);

    function handleAddItemToBasket() {
        if (!product) return;
        setLoadingCart(true);

        if (!item || quantity > item.quantity) {
            const updatedQty = !item ? quantity : quantity - item.quantity;
            agent.Basket.addBasket(product.id!, updatedQty)
                .then((basket: IBasket) => setBasket(basket))
                .catch(error => console.log(error))
                .finally(() => setLoadingCart(false));
        }
        else {
            const updatedQty = item.quantity - quantity;
            agent.Basket.removeBasket(product.id!, updatedQty)
                .then(() => removeItem(product.id!, updatedQty))
                .catch(error => console.log(error))
                .finally(() => setLoadingCart(false));
        }
        
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setQuantity(parseInt(event.currentTarget.value));
    }

    if (loading) return (
        <h2>Loading...</h2>
    )
    if (!product) return (
        <h2>Product not found...</h2>
    )

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{ width: '100%', }} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">
                    {product.name}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h4" color='secondary'>
                    ${(product.price / 100).toFixed(2)}
                </Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity In Stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>
                                    <div style={{ position:'relative' }}>
                                        <label style={{ position: 'absolute', top: '-8px', left: '20px', backgroundColor: '#fff', padding: '0 4px', }}>Qty in Cart:</label>
                                        <input style={{ padding: '6px', marginRight: '12px', }} type="number" value={quantity} onChange={handleInputChange} min='0'/>
                                        <button className="btn btn-primary" onClick={handleAddItemToBasket} disabled={(item && item.quantity === quantity) || (!item && quantity === 0)}>
                                            {loadingCart ? ("Loading...") : ( !item || item.quantity === 0 ? "Add To Cart" : "Update Cart" )}
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}
