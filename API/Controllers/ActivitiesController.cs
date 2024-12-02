using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    // the route will be: "api/activities"
    [HttpGet] 
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new List.Query());
    }

    // the route will be: "api/activities/{Guid id for the Activity}"
    [HttpGet("{id}")] 
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        // using object initializer to pass the argument Id to the Query
        return await Mediator.Send(new Details.Query { Id = id });
    }

    [HttpPost]
    public async Task<IActionResult> CreateActivity(Activity activity)
    {
        await Mediator.Send(new Create.Command() { Activity = activity });
        return Ok();
    }
}