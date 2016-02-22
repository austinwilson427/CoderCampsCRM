using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CoderCampsCRM.Models
{
    public class Quota
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }
        public decimal QuotaSet { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public DateTime? CreatedOn { get; set; }

    }
}