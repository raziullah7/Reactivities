using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Edit
{
    public class Command : IRequest
    {
        public Activity Activity { get; set; }
    }

    public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync(request.Activity.Id);

            // automapper gets the altered properties from request.Activity and
            // writes them onto activity in the database
            mapper.Map(request.Activity, activity);
            
            await context.SaveChangesAsync();
        }
    }
}