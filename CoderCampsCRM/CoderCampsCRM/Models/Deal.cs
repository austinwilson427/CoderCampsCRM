using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CoderCampsCRM.Models
{
    public class Deal
    {
        public int Id { get; set; }
        public string DealName { get; set; }
        public string Stage { get; set; }
        public decimal Amount { get; set; }
        public DateTime CloseDate { get; set; }
        public bool isArchived { get; set; }

        public int? ContactId { get; set; }
        [ForeignKey("ContactId")]
        public Contact Contact { get; set; }

        public int? CompanyId { get; set; }
        [ForeignKey("CompanyId")]
        public Company Company { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }

        public DateTime? CreatedOn { get; set; }
    }
}