
namespace multitier.Models {
    public class Artisan {
        public int Id { get; set; }

        public String IdentityType { get; set; }

        public DateTime DateJoined { get; set; }

        public string LicenceNumber { get; set; }

        public string profileUrl {get; set;}

        public string Description { get; set; }

        public string Location {get; set;}

        public string LicencedOrganization {get; set;}

        public string UserId { get; set; }
        public User User {get; set;} 

        public int SkillId {get; set;}
        public Skill Skills {get; set;}

        public ICollection<Job> Jobs {get; set;}

        public Artisan() => this.DateJoined = DateTime.UtcNow;
    }
    
}