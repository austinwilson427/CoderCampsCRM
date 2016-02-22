using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CoderCampsCRM.Models
{
    public class CompanyLogItem
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string Content { get; set; }
        public string SubmittedBy { get; set; }
        public int? TaskId { get; set; }
     

      
        public Company Company { get; set; }

        /*Added by Austin Wilson for Dashboard Updates*/
        public DateTime? CreatedOn { get; set; }
    }
}