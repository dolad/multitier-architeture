using Microsoft.AspNetCore.Mvc;
using multitier.Data;
using multitier.Models;
using multitier.Models.DTOs.Requests;
using multitier.Models.DTOs.Responses;
using Microsoft.EntityFrameworkCore;

namespace multitier.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase 
    {
         private readonly MyDbContext _context;

         public CategoryController(MyDbContext context)
         {
             _context = context;
         }

        // add categories of skills
        [HttpPost]
         public async Task<ActionResult<Category>> AddCategory([FromBody] CategoryRequest category)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Forbid();
                }
                var categoryExist = _context.Categories.Where(c => c.Title == category.Title).FirstOrDefault();
                if (categoryExist != null) {
                    return Conflict(new ErrorResponse(){
                            Errors = "Category already exist",
                            Success = false
                        });
                }
                {
                    var newCategory = new Category() { Title = category.Title, Description = category.Description };
                    _context.Categories.Add(newCategory);
                    await _context.SaveChangesAsync();
                    return CreatedAtAction("Add Category", new { id = newCategory.Id }, newCategory);
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

         // get All categories
         // GET: api/Category
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var category =  await _context.Categories.Include("Skills").ToListAsync();
            return Ok(category);
        }

        // get one categories
         [HttpGet("{id}")]
         public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }
 
        

    }
}