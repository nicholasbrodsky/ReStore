using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;
    private readonly StoreContext _storeContext;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, StoreContext storeContext)
    {
        _logger = logger;
        _storeContext = storeContext;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<Product> Get()
    {
        DbInitializer.Initialize(_storeContext);
        return _storeContext.Products.ToArray();

        // return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        // {
        //     Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
        //     TemperatureC = Random.Shared.Next(-20, 55),
        //     Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        // })
        // .ToArray();
    }
}
