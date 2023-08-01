import { IBasketItem } from "../../models/basket";
import BasketItem from "./BasketItem";
import { useStoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";

export default function BasketPage() {
    const {basket} = useStoreContext();

    // if (loading) return (<h3>Loading...</h3>)

    if (!basket) return (<h3>Not Found...</h3>)

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-9">
                    {basket.basketItems.map((item: IBasketItem) => (
                        <BasketItem item={item} key={item.product.id} />
                    ))}
                </div>
                <div className="col" style={{ margin: 24, padding: 12, borderRadius: 4, border: '1px solid #ccc', boxShadow: '2px 2px 4px #aaa', height: 'auto' }}>
                    <div>
                        <span>Total Items: </span>
                        <span>{basket.basketItems.reduce((sum, item) => sum += item.quantity, 0)}</span>
                    </div>
                    <div>
                        <span>Subtotal: </span>
                        <span>${(basket.basketItems.reduce((sum, item) => sum += (item.product.price * item.quantity), 0) / 100).toFixed(2)}</span>
                    </div>
                    <hr />
                    <Link to={'/checkout'}>
                        <button className="btn btn-primary">Checkout</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
