using Microsoft.AspNetCore.Mvc;
using TripBuddy.Data;
using TripBuddy.Models;
using System.Linq;

namespace TripBuddy.Controllers
{
    public class BookingController : Controller
    {
        private readonly ApplicationDbContext _context;

        public BookingController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        // SAVE OR UPDATE BOOKING
        // Handles create and update booking operations
        // Uses CustomerID to differentiate new vs existing booking

        [HttpPost]
        public IActionResult Save(UserForm model)
        {
            if (model.CustomerID == 0)
            {
                _context.UserForm.Add(model);
            }
            else
            {
                /*
                 x => x.CustomerID == model.CustomerID

                 for each row x in UserForm table
                   check if x.CustomerID == model.CustomerID
                    If they match → record is selected
                */

                var existing = _context.UserForm.FirstOrDefault(x => x.CustomerID == model.CustomerID);
                if (existing != null)
                {
                    existing.CustomerName = model.CustomerName;
                    existing.MobileNo = model.MobileNo;
                    existing.Email = model.Email;
                    existing.PackageName = model.PackageName;
                    existing.Price = model.Price;
                }
            }

            _context.SaveChanges();
            return Ok();
        }

        // GET ALL BOOKINGS (EXCLUDE SOFT DELETED)
        // Fetch all active (not deleted) bookings

        [HttpGet]
        public IActionResult GetBookings()
        {
            var result = _context.UserForm
                .Where(x => !x.IsDeleted)
                .Select(x => new
                {
                    x.CustomerID,
                    x.CustomerName,
                    x.MobileNo,
                    x.PackageName,
                    x.Price
                })
                .ToList();

            return Json(result);
        }

        // GET BOOKING BY ID
        [HttpGet]
        public IActionResult GetBookingById(int id)
        {
            var data = _context.UserForm
                .Where(x => x.CustomerID == id && !x.IsDeleted)
                .Select(x => new
                {
                    x.CustomerID,
                    x.CustomerName,
                    x.MobileNo,
                    x.Email,
                    x.PackageName,
                    x.Price
                })
                .FirstOrDefault();

            return Json(data);
        }

        // SOFT DELETE BOOKING
        // Soft delete: marks booking as deleted instead of removing from database

        [HttpPost]
        public IActionResult SoftDelete(int id)
        {
            var booking = _context.UserForm.FirstOrDefault(x => x.CustomerID == id);
            if (booking == null)
                return NotFound();

            booking.IsDeleted = true;
            _context.SaveChanges();
            return Ok();
        }
    }
}
