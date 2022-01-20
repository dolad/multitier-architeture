using Microsoft.AspNetCore.Identity;

namespace multitier.Models {
    public class User : IdentityUser {
        
        public Artisan Artisan { get; set; }

        public ICollection<Job> Jobs {get; set;}


    }
}