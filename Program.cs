using Microsoft.EntityFrameworkCore;
using multitier.Data;
using multitier.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using  Microsoft.IdentityModel.Tokens;
using multitier.Models;





var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// configure jwtConfigurations
builder.Services.Configure<JwtConfig>(builder.Configuration.GetSection("JwtConfig"));
builder.Services.AddControllersWithViews().AddNewtonsoftJson(
     options => options.SerializerSettings.ReferenceLoopHandling =            
     Newtonsoft.Json.ReferenceLoopHandling.Ignore
);;


// builder.Services.AddControllers().AddNew
// this bind the database context to the application;
builder.Services.AddDbContext<MyDbContext>(opt => opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
// add jwt to the service
builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme =  JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(jwt => {
    var key = Encoding.ASCII.GetBytes(builder.Configuration["JwtConfig:Secret"]);
    jwt.SaveToken = true;
    jwt.TokenValidationParameters = new TokenValidationParameters{
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        RequireExpirationTime = false,
    };
});

builder.Services.AddDefaultIdentity<User>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<MyDbContext>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseCors(
    builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()
);
app.UseHttpsRedirection();
app.UseAuthentication();

app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");;

app.Run();
