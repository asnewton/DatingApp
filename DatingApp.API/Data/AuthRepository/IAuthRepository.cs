using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IAuthRepository
    {
        //
        // Summary:
        //     Creates a new User in Database.
        //
        // Parameters:
        //   user:
        //     Instance of User object contains user details.
        //
        //   password:
        //     String of user password. 
         Task<User> Reegister(User user, string password);
         Task<User> Login(string username, string password);
         Task<bool> UserExists(string username);
    }
}