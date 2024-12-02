using Domain;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Create
{
    // as it's a command, its does not return anything
    public class Command : IRequest
    {
        public Activity Activity { get; set; }
    }
    
    // the Handler uses the argument from the Command and stores it async
    public class Handler(DataContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            context.Activities.Add(request.Activity);
            await context.SaveChangesAsync();
        }
    }
}