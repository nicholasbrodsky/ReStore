import { IProduct } from "./product";

export interface IBasketItem {
    quantity: number,
    product: IProduct,
}

export interface IBasket {
    id: number,
    buyerId: string,
    basketItems: IBasketItem[],
}