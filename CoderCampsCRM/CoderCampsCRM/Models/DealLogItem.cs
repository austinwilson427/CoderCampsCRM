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

        public int? TaskId { get; set; }
        //[ForeignKey("TaskId")]
        //public Task Task { get; set; }

        public int? ContactId { get; set; }
        [ForeignKey("ContactId")]
        public Contact Contact { get; set; }

        [ForeignKey("DealId")]
        public Deal Deal { get; set; }
        public int DealId { get; set; }

    }
}