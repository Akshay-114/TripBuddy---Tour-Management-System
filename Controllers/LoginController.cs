using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using TripBuddy.Data;   // namespace where ApplicationDbContext exists
using System.Linq;

public class LoginController : Controller
{
    private readonly ApplicationDbContext _context;

    // Dependency Injection
    public LoginController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public JsonResult CheckLogin(string userName, string password)

    {
        // Handles user authentication
        var user = _context.Login
            .FirstOrDefault(x => x.UserName == userName && x.Password == password);

        if (user != null)
        {
            // ASP.NET Core session
            // Stores logged-in user details in session

            HttpContext.Session.SetInt32("UserID", user.UserID);
            HttpContext.Session.SetString("UserName", user.UserName);

            return Json(new { success = true });
        }

        // Returns JSON response for AJAX login
        return Json(new { success = false });
    }
}
