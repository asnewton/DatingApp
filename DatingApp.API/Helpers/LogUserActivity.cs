using System.Security.Claims;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace DatingApp.API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContect = await next();
            
            var userId = int.Parse(resultContect.HttpContext.
                User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var repo = resultContect.HttpContext.RequestServices.GetService<IDatingRepository>();
            var user = await repo.GetUser(userId);
            user.LastActive = System.DateTime.Now;
            await repo.SaveAll();
        }
    }
}