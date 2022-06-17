using Infrastructure;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using Microsoft.Identity.Web.TokenCacheProviders.InMemory;
using Services;
using Services.Contracts;
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);


var configuration = new ConfigurationBuilder()
               .SetBasePath(Directory.GetCurrentDirectory())
               .AddJsonFile("appsettings.json")
               .Build();

//builder.Services.AddAuthentication(AzureADDefaults.BearerAuthenticationScheme)
//    .AddAzureADBearer(options => configuration.Bind("AzureAd", options));


builder.Services.AddMicrosoftIdentityWebApiAuthentication(configuration, "AzureAd");

builder.Services.AddCors((options =>
{
    options.AddPolicy(MyAllowSpecificOrigins, builder => builder
                .WithOrigins("http://localhost:4200", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
     );
}));


var connectionString = configuration.GetConnectionString("BBBankDBConnString");

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<DbContext, BBBankContext>();

builder.Services.AddDbContext<BBBankContext>(
b => b.UseSqlServer(connectionString)
.UseLazyLoadingProxies(true)
);
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
