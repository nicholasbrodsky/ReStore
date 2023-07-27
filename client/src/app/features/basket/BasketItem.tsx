import { useState } from "react";
import agent from "../../agent";
import { IBasketItem } from "../../models/basket"
import { useStoreContext } from "../../context/StoreContext";

interface IProps {
    item: IBasketItem,
}

export default function BasketItem({item}: IProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const { setBasket, removeItem } = useStoreContext();

    function addBasketItem(productId: number) {
        setLoading(true);
        agent.Basket.addBasket(item.product.id!, 1)
            .then(basket => setBasket(basket))
            .catch()
            .finally(() => setLoading(false));
    }

    function removeBasketItem(productId: number) {
        setLoading(true);
        agent.Basket.removeBasket(item.product.id!, 1)
            .then(() => removeItem(item.product.id!, 1))
            .catch()
            .finally(() => setLoading(false));
    }

    return (
        <div className="row" style={{ margin: 24, padding: 12, borderRadius: 4, border: '1px solid #ccc', boxShadow: '4px 4px 12px #aaa' }}>
            <div className="col-sm-4">
                <img src={item.product.pictureUrl} width={'100%'} />
            </div>
            <div className="col-sm-8">
                <h4>{item.product.name}</h4>
                <div className="col-sm-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h6>Quantity: </h6>
                    <button onClick={() => removeBasketItem(item.product.id!)} className="btn btn-sm btn-danger">-</button>
                    { loading ? <span>Loading...</span> : <span>{item.quantity}</span>}
                    <button onClick={() => addBasketItem(item.product.id!)} className="btn btn-sm btn-primary">+</button>
                </div>
            </div>
        </div>
    )
}
