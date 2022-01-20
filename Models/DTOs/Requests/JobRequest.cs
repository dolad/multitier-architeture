using System.ComponentModel.DataAnnotations;


namespace multitier.Models.DTOs.Requests {
    public class JobRequest {
        [Required]
         public string Title { get; set; }


         [Required]
        public string Description { get; set; }


         [Required]
        public string UserId {get; set;}

        public int ArtisanId { get; set; }

    }
}