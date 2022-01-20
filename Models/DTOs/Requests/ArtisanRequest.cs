using System.ComponentModel.DataAnnotations;

namespace multitier.Models.DTOs.Requests {
    public class ArtisanRequest {
        [Required]
         public String IdentityType { get; set; }


         [Required]
        public string LicenceNumber { get; set; }

         [Required]
        public string Description { get; set; }

        [Required]
        public string Location {get; set;}

        public string profileUrl {get; set;}

         [Required]
        public string LicencedOrganization {get; set;}

         [Required]
        public string UserId { get; set; }

         [Required]
        public int SkillId {get; set;}

    }
}