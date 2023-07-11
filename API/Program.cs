// create web app host to run app
// runs app via kestrel server
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// dep inj container - when we want to use a service inside a class in our proj (inj service to be used inside the app)

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


// Configure the HTTP request pipeline. - Middleware
// api handles request coming in (handles what happens between request coming in and response being sent out)

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
