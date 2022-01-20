using System.ComponentModel.DataAnnotations;


namespace multitier.Models.DTOs.Requests {
    public class CompleteJobRequest {
        [Required]
         public String Status { get; set; }


         [Required]
        public string CustomerFeedback { get; set; }


        [Required] 
        public decimal Rating { get; set; }

         [Required]
        public int Id {get; set;}

        public string UsersId {get; set;}


    }
}