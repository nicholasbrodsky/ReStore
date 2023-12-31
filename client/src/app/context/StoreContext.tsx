// this component will hold state
// make component to wrap around app and have state available from anywhere in the app
// makes properties and methods here available everywhere within this component

import { PropsWithChildren, createContext, useContext, useState } from "react";
import { IBasket } from "../models/basket";

interface IStoreContextValue {
    basket: IBasket | null
    setBasket: (basket: IBasket) => void
    removeItem: (productId: number, quantity: number) => void
}

const StoreContext = createContext<IStoreContextValue | undefined>(undefined);

export function useStoreContext() {
    const context = useContext(StoreContext);

    if (context === undefined)
        throw Error("Not inside provider.");
    
    // context allows access to content in IStoreContextValue interface
    return context;
}

export function StoreProvider({children}: PropsWithChildren<any>) {
    const [basket, setBasket] = useState<IBasket | null>(null);

    function removeItem(productId: number, quantity: number) {
        if (!basket) return;
        const basketItems = [...basket.basketItems];
        const itemIndex = basketItems.findIndex(item => item.product.id === productId);
        if (itemIndex >= 0) {
            basketItems[itemIndex].quantity -= quantity;
            if (basketItems[itemIndex].quantity === 0)
            basketItems.splice(itemIndex, 1);
            setBasket(prevState => {
                return {...prevState!, basketItems};
            });
        }
    }

    return (
        <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
            {children}
        </StoreContext.Provider>
    )
}
