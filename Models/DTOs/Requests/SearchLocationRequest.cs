

using System.ComponentModel.DataAnnotations;


namespace multitier.Models.DTOs.Requests {
    public class SearchByLocationRequest {
        [Required]
         public string location { get; set; }

    }
}