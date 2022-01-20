using System.Collections.Generic;
using multitier.Models;

namespace multitier.Configuration{

    public class AuthResult {
        public string Token { get; set; }

        public bool Success { get; set; }

        public User user {get; set;}

        public List<string> Errors {get; set;}
    }
}