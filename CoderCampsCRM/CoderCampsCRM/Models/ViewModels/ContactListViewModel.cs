using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CoderCampsCRM.Models.ViewModels
{
    public class ContactListViewModel : ApiController
    {
        public List<Company> Companies { get; set; }
        public List<Contact> Contacts { get; set; }
        public List<Deal> Deals { get; set; }
        public List<ContactInteraction> Interactions { get; set; }
        public List<UserTask> Tasks { get; set; }
    }
}