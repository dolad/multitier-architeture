using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace multitier.Models {
    public class Job {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description {get; set;}

       [Column(TypeName = "decimal(5,2)")]
        public decimal? Rating { get; set; }


        public string Status  {get; set;}

        public string? CustomerFeedback { get; set; }

        public DateTime CreatedAt { get; set; }

        public string UsersId {get; set;}
        public User Users {get; set;}

        public int ArtisanId { get; set; }
        public Artisan Artisan {get; set;}

        public Job()
        {
            this.CreatedAt = DateTime.UtcNow;
        }
    }
}