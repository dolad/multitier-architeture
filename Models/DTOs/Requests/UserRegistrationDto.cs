using System.ComponentModel.DataAnnotations;

namespace multitier.Models.DTOs.Requests {
    public class UserRegistrationDto {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password {get; set;}

        [Required]
        public string Username { get; set; }


       
    }
}