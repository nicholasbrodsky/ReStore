import { useState } from "react";
import agent from "../../agent";
import { IBasketItem } from "../../models/basket"

interface IProps {
    item: IBasketItem,
}

export default function BasketItemPage({item}: IProps) {
    
    const [loading, setLoading] = useState<boolean>(true);
    const [basketItem, setBasketItem] = useState<IBasketItem | null>(null);

    function addBasketItem(productId: number) {
        agent.Basket.addBasket(productId, 1)
            .then(() => {
                setLoading(true);
                agent.Basket.getBasket()
                    .then(basket => {
                        // let basketItem =
                    })
                    .catch(error => console.log(error))
                    .finally(() => setLoading(false));
            })
            .catch(() => console.log("error adding"))
            .finally();
    }

    function removeBasketItem(productId: number) {

    }

    return (
        <div className="row">
            <div className="col-sm-4">
                <img src={item.product.pictureUrl} width={'100%'} />
            </div>
            <div className="col-sm-8">
                <h4>{item.product.name}</h4>
                <div className="col-sm-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h6>Quantity: </h6>
                    <button onClick={() => removeBasketItem(item.product.id!)} className="btn btn-sm btn-danger">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addBasketItem(item.product.id!)} className="btn btn-sm btn-primary">+</button>
                </div>
            </div>
        </div>
    )
}
