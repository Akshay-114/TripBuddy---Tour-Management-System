using Microsoft.AspNetCore.Mvc;
using TripBuddy.Data;
using TripBuddy.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Linq;

namespace TripBuddy.Controllers
{
    public class PackageController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;

        public PackageController(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }


        // SAVE NEW PACKAGE
        // Handles package creation with optional image upload
        [HttpPost]
        public IActionResult SavePackage(AddPackages model, IFormFile ImageFile)
        {
            if (ImageFile != null)
            {
                string folder = Path.Combine(_env.WebRootPath, "uploads");
                Directory.CreateDirectory(folder);

                string fileName = Guid.NewGuid() + Path.GetExtension(ImageFile.FileName);
                string filePath = Path.Combine(folder, fileName);

                using var stream = new FileStream(filePath, FileMode.Create);
                ImageFile.CopyTo(stream);

                model.ImagePath = "/uploads/" + fileName;
            }

            else
            {
                // DEFAULT IMAGE
                model.ImagePath = "/lib/no-image.jpg";
            }

            _context.AddPackages.Add(model);
            _context.SaveChanges();

            return Ok();
        }


        // GET ALL PACKAGES
        // Retrieves all active packages for display
        [HttpGet]
        public IActionResult GetPackages()
        {
            var data = _context.AddPackages
                .Where(x => !x.IsDeleted)
                .Select(x => new
                {
                    x.PackageId,
                    x.PackageName,
                    x.Location,
                    x.Description,
                    x.Price,
                    x.ImagePath
                })
                .ToList();

            return Json(data);
        }


        // EDIT
        // Fetches a single package for edit operation
        [HttpGet]
        public IActionResult GetPackageById(int id)
        {
            var data = _context.AddPackages
                .Where(x => x.PackageId == id && !x.IsDeleted)
                .Select(x => new {
                    x.PackageId,
                    x.PackageName,
                    x.Location,
                    x.Description,
                    x.Price,
                    x.ImagePath
                })
                .FirstOrDefault();

            if (data == null)
                return NotFound();

            return Json(data);
        }


        // UPDATE
        // Updates package details and optionally replaces image
        [HttpPost]
        public IActionResult UpdatePackage(AddPackages model, IFormFile ImageFile)
        {
            var existing = _context.AddPackages
                .FirstOrDefault(x => x.PackageId == model.PackageId && !x.IsDeleted);

            if (existing == null) return NotFound();

            existing.PackageName = model.PackageName;
            existing.Location = model.Location;
            existing.Description = model.Description;
            existing.Price = model.Price;

            if (ImageFile != null)
            {
                string folder = Path.Combine(_env.WebRootPath, "uploads");
                Directory.CreateDirectory(folder);

                string fileName = Guid.NewGuid() + Path.GetExtension(ImageFile.FileName); //timestamp
                string filePath = Path.Combine(folder, fileName);

                using var stream = new FileStream(filePath, FileMode.Create);
                ImageFile.CopyTo(stream);

                existing.ImagePath = "/uploads/" + fileName;
            }

            _context.SaveChanges();
            return Ok();
        }


        //SOFT DELETE PACKAGE
        // Soft deletes package instead of removing from database
        [HttpPost]
        public IActionResult SoftDelete(int id)
        {
            var pkg = _context.AddPackages.FirstOrDefault(x => x.PackageId == id);
            if (pkg == null) return NotFound();

            pkg.IsDeleted = true;
            _context.SaveChanges();

            return Ok();
        }
    }
}
