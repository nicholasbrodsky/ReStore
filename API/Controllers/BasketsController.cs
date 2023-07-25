using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BasketsController : ControllerBase
    {
        private readonly StoreContext _context;
        public BasketsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDTO>> GetBasket()
        {
            Basket basket = await RetrieveBasket();

            if (basket is null) return NotFound();

            var basketDTO = new BasketDTO
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                BasketItems = basket.BasketItems.Select(item => new BasketItemDTO
                {
                    // Id = item.Id,
                    Quantity = item.Quantity,
                    Product = item.Product,
                }).ToList(),
            };

            return basketDTO;
        }

        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            Basket basket = await RetrieveBasket();

            if (basket is null)
            {
                // var buyerId = new Guid().ToString();
                var buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions
                {
                    IsEssential = true,
                    Expires = DateTime.Now.AddDays(7),
                    HttpOnly = false,
                };
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
                basket = new Basket
                {
                    BuyerId = buyerId,
                };
                _context.Baskets.Add(basket);
            }

            Product product = await _context.Products.FindAsync(productId);
            if (product is null)
            {
                return NotFound();
            }

            basket.AddItem(product: product, quantity: quantity);

            int result = await _context.SaveChangesAsync();
            if (result > 0)
                return CreatedAtRoute("GetBasket", new BasketDTO
                {
                    Id = basket.Id,
                    BuyerId = basket.BuyerId,
                    BasketItems = basket.BasketItems.Select(item => new BasketItemDTO
                    {
                        // Id = item.Id,
                        Quantity = item.Quantity,
                        Product = item.Product,
                    }).ToList(),
                });
                // return Created("GetBasket", new BasketDTO
                // {
                //     Id = basket.Id,
                //     BuyerId = basket.BuyerId,
                //     BasketItems = basket.BasketItems.Select(item => new BasketItemDTO
                //     {
                //         // Id = item.Id,
                //         Quantity = item.Quantity,
                //         Product = item.Product,
                //     }).ToList(),
                // });

            return BadRequest(new ProblemDetails
            {
                Title = "Problem saving item to basket."
            });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket is null)
                return NotFound();
            
            basket.RemoveItem(productId, quantity);

            int result = await _context.SaveChangesAsync();
            if (result > 0)
                return Ok();
            
            return BadRequest(new ProblemDetails
            {
                Title = "Problem removing item from basket.",
            });
        }

        private async Task<Basket> RetrieveBasket() => await _context.Baskets
                            .Include(basket => basket.BasketItems)
                            .ThenInclude(basketItem => basketItem.Product)
                            .FirstOrDefaultAsync(b => b.BuyerId == Request.Cookies["buyerId"]);
    }
}