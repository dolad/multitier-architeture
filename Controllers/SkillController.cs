using Microsoft.AspNetCore.Mvc;
using multitier.Data;
using multitier.Models;
using multitier.Models.DTOs.Requests;
using multitier.Models.DTOs.Responses;
using Microsoft.EntityFrameworkCore;


namespace multitier.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class SkillController : ControllerBase 
    {
         private readonly MyDbContext _context;

         public SkillController(MyDbContext context)
         {
             _context = context;
         }

          // get All Skills
         // GET: api/Skill
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Skill>>> GetSkills()
        {
            var skills = await _context.Skills.ToListAsync();
            return Ok(skills);
        }

        // add categories of skills
        [HttpPost]
         public async Task<ActionResult<Skill>> AddSkill([FromBody] SkillRequest skill)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Forbid();
                }
                var skillExist = _context.Skills.Where(c => c.Title == skill.Title).FirstOrDefault();
                
                var categoryExist =  _context.Categories.Where( b => b.Id == skill.CategoryId).FirstOrDefault();
                // invalid category id passed
                if (categoryExist == null) {
                    return BadRequest(new ErrorResponse(){
                        Errors = "Category selected does not exist",
                        Success = false
                    });
                }
                if (skillExist != null) {
                    return BadRequest(new ErrorResponse(){
                        Errors = "Skill already exist",
                        Success = false
                    });
                }
                // check if the skill has not been added already
                    var newSkill = new Skill(){Title = skill.Title, Description = skill.Description, CategoryId = skill.CategoryId};
                    _context.Skills.Add(newSkill);
                    await _context.SaveChangesAsync();
                    return CreatedAtAction("Add Skill",
                                           new CreateSkillResponses(){
                                               Title = newSkill.Title,
                                               Id = newSkill.Id,
                                               Description = newSkill.Description,
                                               CategoryId = newSkill.CategoryId
                                           }
                                           );
            
                

            }
            catch (Exception ex)
            {
                // unhandled any unhandled exception
                return BadRequest(new ErrorResponse(){
                            Errors = ex.Message,
                            Success = false
                        });
        
            }
        
        }

    
        // get one categories
         [HttpGet("{id}")]
         public async Task<ActionResult<Skill>> GetSkill(int id)
        {
            var note = await _context.Skills.FindAsync(id);
            if (note == null)
            {
                return NotFound();
            }

            return note;
        }

    }
}