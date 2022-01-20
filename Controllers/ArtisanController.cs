using Microsoft.AspNetCore.Mvc;
using multitier.Data;
using multitier.Models;
using multitier.Models.DTOs.Requests;
using multitier.Models.DTOs.Responses;
using Microsoft.EntityFrameworkCore;

namespace multitier.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ArtisanController : ControllerBase 
    {
         private readonly MyDbContext _context;

         public ArtisanController(MyDbContext context)
         {
             _context = context;
         }

        // add artisan
        [HttpPost]
         public async Task<ActionResult<Artisan>> AddArtisan([FromBody] ArtisanRequest artisan)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Forbid();
                }
                var artisanExist = _context.Artisans.Where(c => c.UserId == artisan.UserId).FirstOrDefault();
                if (artisanExist != null) {
                    return Conflict(new ErrorResponse(){
                            Errors = "Artisan already registered",
                            Success = false
                        });
                }
                {
                    var newArtisan = new Artisan() { IdentityType = artisan.IdentityType, LicenceNumber = artisan.LicenceNumber, LicencedOrganization = artisan.LicencedOrganization, profileUrl=artisan.profileUrl, Description= artisan.Description, UserId = artisan.UserId, Location= artisan.Location, SkillId = artisan.SkillId };
                    _context.Artisans.Add(newArtisan);
                    await _context.SaveChangesAsync();
                    return CreatedAtAction("Add Artisan", new { id = newArtisan.Id }, newArtisan);
                }
               

            }
            catch (Exception ex)
            {
                return BadRequest(new ErrorResponse(){
                            Errors = ex.Message,
                            Success = false
                        });
        
            }
            
           
        }

         // get All Artisan
         // GET: api/Artisan
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Artisan>>> GetArtisans()
        {
            var artisan =  await _context.Artisans.Include("Skills").Include("User").ToListAsync();
            return Ok(artisan);
        }

        // get one artisan
         [HttpGet("{id}")]
         public async Task<ActionResult<Artisan>> GetArtisan(int id)
        {
            var artisan = await _context.Artisans.Include( i => i.Skills).Include(i => i.User).SingleAsync(x => x.Id == id);

            if (artisan == null)
            {
                return NotFound();
            }

            return artisan;
        }

         [HttpPost("location")]
         public async Task<ActionResult<Artisan>> GetArtisanByLocation([FromBody] SearchByLocationRequest searchByQuery)
        {
            var artisan = await _context.Artisans.Include( i => i.Skills).Include(i => i.User).Where(x => x.Location == searchByQuery.location).ToListAsync();

            if (artisan == null)
            {
                return NotFound();
            }

            return Ok(artisan);;
        }

         [HttpPost]
         [Route("skills")]
         public async Task<ActionResult<Skill>> GetArtisanBySkill([FromBody] SKillSearchRequest searchBySkill)
        {
            var skillExist = await _context.Skills.SingleAsync(x => x.Title == searchBySkill.skill);

            if(skillExist == null){
                return NotFound("This skills is not available");
            }
            var artisan = await _context.Artisans.Include( i => i.Skills).Include(i => i.User).Where(c => c.SkillId == skillExist.Id).ToListAsync();
            if (artisan == null)
            {
                return NotFound("We does not have any artisan available for this skills");
            }

            return skillExist;
        }
 
    }
}