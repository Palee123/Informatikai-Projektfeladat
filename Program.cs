using AppDbContextNamespace.Data;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Repositories;
using WebApplication1.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


ConfigurationManager Configuration = builder.Configuration;

// appsettings-ben a jelszó az legyen ami a postgreSQL-ednek

builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(
    Configuration["ConnectionStrings:WebappConnection"]));

builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<ProductRepository>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<ProductService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

//app.UseDefaultFiles();

app.UseStaticFiles();

app.MapControllers();

app.Run();

