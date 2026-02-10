using Microsoft.AspNetCore.Http;

using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TripBuddy.Models
{
    public class AddPackages
    {
        [Key]
        public int PackageId { get; set; }
        public string? PackageName { get; set; }
        public string? Location { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public string ImagePath { get; set; }

        public bool IsDeleted { get; set; } = false;
    }
}





