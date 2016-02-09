using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoderCampsCRM.Models
{
    public class UserTask
    {
        public int Id { get; set; }
        public string TaskType { get; set; }
        public string TaskStartDate { get; set; }
        public string TaskDueDate { get; set; }
        public string TaskDescription { get; set; }
        public string Status { get; set; }
    }
}