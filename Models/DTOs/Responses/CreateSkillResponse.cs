namespace multitier.Models.DTOs.Responses{

    public class CreateSkillResponses {
        public long Id { get; set; }
    
         public string Title { get; set; }
    

        public string Description {get; set;}

        public Category Category {get; set;}

        public int CategoryId { get; set; }

    }
}