using System.ComponentModel.DataAnnotations;

namespace multitier.Models.DTOs.Requests {
    public class GetJobRequest {
        [Required]       
        public string userId { get; set; }

    }
}