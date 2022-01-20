using Microsoft.AspNetCore.Mvc;
using multitier.Data;
using multitier.Models;
using multitier.Models.DTOs.Requests;
using multitier.Models.DTOs.Responses;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace multitier.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase 
    {
         private readonly MyDbContext _context;

         public readonly IMapper _mapper;

         public JobController(MyDbContext context, IMapper mapper)
         {
             _context = context;
              _mapper = mapper;
         }

        // add artisan
        [HttpPost]
         public async Task<ActionResult<Job>> AddJob([FromBody] JobRequest jobDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Forbid();
                }
                // check if there is no active job with customer and artisan before raising new job
                var ongoing = "Ongoing";
                var jobIsOngoing = _context.Jobs.Where(c => c.UsersId == jobDto.UserId).Where(c => c.ArtisanId == jobDto.ArtisanId).Where(c => c.Status == ongoing).FirstOrDefault();
                if (jobIsOngoing != null) {
                    return Conflict(new ErrorResponse(){
                            Errors = "There is a running job please complete",
                            Success = false
                        });
                }
                {
                    var newJob = new Job() { Title = jobDto.Title, Description = jobDto.Description, UsersId = jobDto.UserId, ArtisanId = jobDto.ArtisanId, Status = "ongoing"};
                    _context.Jobs.Add(newJob);
                    await _context.SaveChangesAsync();
                    return CreatedAtAction("Add Job", new { id = newJob.Id }, newJob);
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

         // get All Job
         // GET: api/Job
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Job>>> GetJobs()
        {
            var job =  await _context.Jobs.Include("Artisan").Include("Users").ToListAsync();
            return Ok(job);
        }

        // get one artisan
         [HttpGet("{id}")]
         public async Task<ActionResult<Job>> GetJob(int id)
        {
            var artisan = await _context.Jobs.Include( i => i.Artisan).Include(i => i.Users).SingleAsync(x => x.Id == id);

            if (artisan == null)
            {
                return NotFound();
            }

            return artisan;
        }

         // get one art
         [HttpPost("user")]
          
         public async Task<ActionResult<IEnumerable<Job>>> GetUserJobs([FromBody] GetJobRequest userId)
        {
            var jobs = await _context.Jobs.Include( i => i.Artisan).Include(i => i.Users).Where(x => x.UsersId == userId.userId).ToListAsync();

            if (jobs == null)
            {
                return NotFound();
            }
            return jobs;
        }

        [HttpGet("{artisanId}/artisanId")]
          
         public async Task<ActionResult<IEnumerable<Job>>> GetArtisanJobs([FromQuery] int artisanId)
        {
            var job = await _context.Jobs.Include( i => i.Artisan).Include(i => i.Users).Where(x => x.ArtisanId == artisanId).ToListAsync();

            if (job == null)
            {
                return NotFound();
            }

            return job;
        }

        [HttpPut]
        [Route("Complete")]
         public async Task<ActionResult<Job>> CompleteJob([FromBody] CompleteJobRequest completeJobRequestDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Forbid();
                }
                // check if there is no active job with customer and artisan before raising new job
                var ongoing = "ongoing";
                var jobIsOngoing = _context.Jobs.Where(c => c.UsersId == completeJobRequestDto.UsersId).Where(c => c.Id == completeJobRequestDto.Id).Where(c => c.Status == ongoing).FirstOrDefault();
                if (jobIsOngoing == null) {
                    return Conflict(new ErrorResponse(){
                            Errors = "No job running",
                            Success = false
                        });
                }
                var updatedJob = await _context.Jobs.FindAsync(completeJobRequestDto.Id);
                updatedJob.Status = completeJobRequestDto.Status;
                updatedJob.CustomerFeedback = completeJobRequestDto.CustomerFeedback;
                updatedJob.Rating = completeJobRequestDto.Rating;
                await _context.SaveChangesAsync();
                return Ok();                

            }
            catch (Exception ex)
            {
                return BadRequest(new ErrorResponse(){
                            Errors = ex.Message,
                            Success = false
                        });
        
            }
        }
 
    }
}