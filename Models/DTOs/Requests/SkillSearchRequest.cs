

using System.ComponentModel.DataAnnotations;


namespace multitier.Models.DTOs.Requests {
    public class SKillSearchRequest {
        [Required]
         public string skill { get; set; }

    }
}