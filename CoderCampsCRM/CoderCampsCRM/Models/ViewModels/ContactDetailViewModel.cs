using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace CoderCampsCRM.Models
{
    public class ContactDetailViewModel : ApiController
    {
        public Company Company { get; set; }
        public Contact Contact { get; set; }
        public List<Deal> Deals { get; set; }
        public List<Company> Companies { get; set; }
        public List<ContactInteraction> Interactions { get; set; }
        public List<UserTask> Tasks { get; set; }
    }
}