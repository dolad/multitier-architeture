using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using multitier.Configuration;
using Microsoft.Extensions.Options;
using multitier.Models.DTOs.Requests;
using multitier.Models.DTOs.Responses;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using multitier.Models;

namespace multitier.Controllers {

    [Route("api/[controller]")] // api/authManagement
    [ApiController]
    public class AuthManagementController: ControllerBase {

        private readonly UserManager<User> _userManager;
        private readonly JwtConfig _jwtConfig;


        public AuthManagementController(UserManager<User> userManager, IOptionsMonitor<JwtConfig> optionsMonitor)
        {
            _userManager = userManager;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationDto user){
            if(ModelState.IsValid) {
                var existingUser = await _userManager.FindByEmailAsync(user.Email);
                    if(existingUser != null) {
                        return BadRequest(new RegistrationResponse(){
                    Errors = new List<string>() {
                        "Email is already in user "
                    },
                    Success = false
                    });
                }
                var newUser = new User(){Email = user.Email, UserName = user.Username};
                var isCreated = await _userManager.CreateAsync(newUser, user.Password);
                if(isCreated.Succeeded){
                       var jwt = GenerateJwtToken(newUser);
                       return  Ok(new RegistrationResponse(){
                           Success = true,
                           user = newUser,
                           Token = jwt
                       });
                }else {
                        return BadRequest(new RegistrationResponse(){
                            Errors = isCreated.Errors.Select(x => x.Description).ToList(),
                            Success = false
                        });
                }
            }

            return BadRequest(new RegistrationResponse(){
                Errors = new List<string>() {
                    "Invalid payload "
                },
                Success = false
            });
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] UserLoginRequest user){
             if(ModelState.IsValid){
                 var existingUser = await _userManager.FindByEmailAsync(user.Email);
                 if(existingUser == null) {
                     return BadRequest(new RegistrationResponse(){
                        Errors = new List<string>() {
                            "Invalid Login Request "
                        },
                        Success = false
                    });
                 }
                var isCorrect = await _userManager.CheckPasswordAsync(existingUser, user.Password);
                if(!isCorrect) {
                     return BadRequest(new RegistrationResponse(){
                        Errors = new List<string>() {
                            "Invalid LoginRequest "
                        },
                        Success = false
                    });
                }

                var jwt = GenerateJwtToken(existingUser);
                       return  Ok(new RegistrationResponse(){
                           Success = true,
                           user = existingUser,
                           Token = jwt
                       });
             }

            return BadRequest(new RegistrationResponse(){
                Errors = new List<string>() {
                    "Invalid LoginRequest "
                },
                Success = false
            });
        }

        private string GenerateJwtToken(IdentityUser user) {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtConfig.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(new [] {
                    new Claim("id", user.Id),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) // for refreshToken
                }),
                Expires = DateTime.UtcNow.AddHours(6), //token expriation time
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature) //defined the algorithm
            }; 
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = jwtTokenHandler.WriteToken(token);
            return jwtToken;
        }


    }
}