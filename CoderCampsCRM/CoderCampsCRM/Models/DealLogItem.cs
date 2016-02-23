using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CoderCampsCRM.Models
{
    public class DealLogItem
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string Content { get; set; }
        public string SubmittedBy { get; set; }
        //public int? TaskId { get; set; }
        ////[ForeignKey("TaskId")]
        ////public Task Task { get; set; }

        public int? ContactId { get; set; }
        [ForeignKey("ContactId")]
        public Contact Contact { get; set; }

        public int? DealId { get; set; }
        [ForeignKey("DealId")]
        public Deal Deal { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }

        /*Added by Austin Wilson for Dashboard Updates*/
        public DateTime? CreatedOn { get; set; }
    }
}