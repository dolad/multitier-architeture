using System.ComponentModel.DataAnnotations;

namespace multitier.Models.DTOs.Requests {
    public class SkillRequest {
        [Required]
        
        public string Title { get; set; }
        [Required]

        public string Description {get; set;}

       [Required]
        public int CategoryId {get;set;}
    }
}