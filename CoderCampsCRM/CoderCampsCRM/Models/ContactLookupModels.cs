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
        [ForeignKey("DealId")]
        public Deal Deal { get; set; }
        public int ContactId { get; set; }
        [ForeignKey("ContactId")]
        public Contact Contact { get; set; }
        public string ContactEmail { get; set; }
        public Boolean isDealSharer { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }

        public DateTime? CreatedOn { get; set; }
    }

    public class TaskContact
    {
        public int Id { get; set; }
        public int TaskId { get; set; }
        [ForeignKey("TaskId")]
        public UserTask UserTask { get; set; }
        public int ContactId { get; set; }
        [ForeignKey("ContactId")]
        public Contact Contact { get; set; }
    }

    //public class LocationContact
    //{
    //    public int Id { get; set; }
    //    public int LocationId { get; set; }
    //    [ForeignKey("LocationId")]
    //    public Location Location { get; set; }
    //    public int ContactId { get; set; }
    //    [ForeignKey("ContactId")]
    //    public Contact Contact { get; set; }
    //    public int TaskId { get; set; }
    //    [ForeignKey("TaskId")]
    //    public UserTask UserTask { get; set; }
    //    public int DealId { get; set; }
    //    [ForeignKey("DealId")]
    //    public Deal Deal { get; set; }

    //}
}