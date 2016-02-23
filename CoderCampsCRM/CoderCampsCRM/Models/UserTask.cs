using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CoderCampsCRM.Models
{
    public class UserTask
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string StartDate { get; set; }
        public string DueDate { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public int? DealId { get; set; }
        public int? ContactId { get; set; }
        [ForeignKey("ContactId")]
        public Contact Contact { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }

        /*Added by Austin Wilson for Dashboard Updates*/
        public DateTime? CreatedOn { get; set; }
    }
}