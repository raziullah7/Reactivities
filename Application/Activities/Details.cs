using Domain;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Details
{
    public class Query : IRequest<Activity>
    {
        // property to indicate parameter
        public Guid Id { get; set; }
    }
    
    public class Handler(DataContext context) : IRequestHandler<Query, Activity> 
    {
        // getting parameter from Query class above and finding the Activity async
        public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Activities.FindAsync(request.Id);
        }
    }
}