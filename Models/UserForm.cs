using System.ComponentModel.DataAnnotations;

namespace TripBuddy.Models
{
    public class UserForm
    {
        [Key]
        public int CustomerID { get; set; }

        public string CustomerName { get; set; }

        public string MobileNo { get; set; }

        public string Email { get; set; }

        public string PackageName { get; set; }

        public decimal Price { get; set; }
 
        public bool IsDeleted { get; set; } = false;
    }
}
