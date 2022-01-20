namespace multitier.Models {
    public class Skill {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description {get; set;}
        
        public int CategoryId {get; set;}
        public Category Category {get; set; }

        public ICollection<Artisan> Artisans {get;set;}

    }
}