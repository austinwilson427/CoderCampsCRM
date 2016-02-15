using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CoderCampsCRM.Models
{
    public class DealContact
    {
        public int Id { get; set; }
        public int DealId { get; set; }
        public int ContactId { get; set; }
        [ForeignKey("ContactId")]
        public Contact Contact { get; set; }
    }

    public class TaskContact
    {
        public int Id { get; set; }
        public int TaskId { get; set; }
        public int ContactId { get; set; }
        [ForeignKey("ContactId")]
        public Contact Contact { get; set; }
    }
}