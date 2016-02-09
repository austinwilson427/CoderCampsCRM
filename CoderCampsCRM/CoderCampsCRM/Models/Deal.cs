using System;
using System.Collections.Generic;
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
        public int DealOwnerId { get; set; }
        public int CompanyId { get; set; }
        public bool isArchived { get; set; }
        /*public List<Contact> Contacts { get; set; }*/
    }
}