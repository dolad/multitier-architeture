namespace multitier.Models.DTOs.Responses{

    public class ErrorResponse {
      
        public bool Success { get; set; }

        public string Errors {get; set;}
    }
}