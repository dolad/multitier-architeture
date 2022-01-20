using Microsoft.Extensions.Options;
using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using multitier.Models;
using Microsoft.AspNetCore.Identity;

namespace multitier.Data {
    public class MyDbContext : IdentityDbContext {
       public MyDbContext(DbContextOptions<MyDbContext> options) : base(options){

       }  

       public DbSet<Artisan> Artisans {get; set;}

       public DbSet<Category> Categories {get; set;}

       public DbSet<Job> Jobs {get; set;}


       public DbSet<Skill> Skills {get; set;}


    }
}