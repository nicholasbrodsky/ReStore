using System.Collections.Generic;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }

        public List<BasketItem> BasketItems { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
            if (BasketItems.Any(item => item.ProductId == product.Id))
            {
                BasketItem basketItem = BasketItems.Find(item => item.ProductId == product.Id);
                basketItem.Quantity += quantity;
            }
            else
            {
                BasketItems.Add(new BasketItem
                {
                    Product = product,
                    Quantity = quantity,
                });
            }
        }
        public void RemoveItem(int productId, int quantity = 1)
        {
            if (BasketItems.Any(item => item.ProductId == productId))
            {
                BasketItem basketItem = BasketItems.Find(item => item.ProductId == productId);
                basketItem.Quantity -= quantity;
                if (basketItem.Quantity <= 0)
                {
                    BasketItems.Remove(basketItem);
                }
            }
        }
    }
}