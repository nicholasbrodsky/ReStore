using API.Entities;

namespace API.DTOs
{
    public class BasketItemDTO
    {
        // public int Id { get; set; }
        public int Quantity { get; set; }
        public Product Product { get; set; }
    }
}