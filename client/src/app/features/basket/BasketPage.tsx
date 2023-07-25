import { useEffect, useState } from "react"
import { IBasket, IBasketItem } from "../../models/basket";
import agent from "../../agent";
import BasketItemPage from "./BasketItemPage";

export default function BasketPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [basket, setBasket] = useState<IBasket | null>(null);

    useEffect(() => {
        agent.Basket.getBasket()
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    function removeBasketItem(productId: number) {
        
    }

    if (loading) return (<h3>Loading...</h3>)

    if (!basket) return (<h3>Not Found...</h3>)

    return (
        <div className="container-fluid">
            {basket.basketItems.map((item: IBasketItem) => (
                <BasketItemPage item={item} key={item.product.id} />
            ))}
        </div>
    )
}
