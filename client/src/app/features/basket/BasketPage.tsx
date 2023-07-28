import { IBasketItem } from "../../models/basket";
import BasketItem from "./BasketItem";
import { useStoreContext } from "../../context/StoreContext";

export default function BasketPage() {
    const {basket} = useStoreContext();

    // if (loading) return (<h3>Loading...</h3>)

    if (!basket) return (<h3>Not Found...</h3>)

    return (
        <div className="container-fluid">
            {basket.basketItems.map((item: IBasketItem) => (
                <BasketItem item={item} key={item.product.id} />
            ))}
        </div>
    )
}
