using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController(DataContext context) : BaseApiController
{
    // the route will be: "api/activities"
    [HttpGet] 
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await context.Activities.ToListAsync();
    }

    // the route will be: "api/activities/{Guid id for the Activity}"
    [HttpGet("{id}")] 
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        return await context.Activities.FindAsync(id);
    }
}