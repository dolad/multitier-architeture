using System.ComponentModel.DataAnnotations;

namespace multitier.Models.DTOs.Requests {
    public class CategoryRequest {
        [Required]
        
        public string Title { get; set; }
        [Required]

        public string Description {get; set;}

       

    }
}