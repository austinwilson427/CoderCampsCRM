using CoderCampsCRM.Models.ViewModels;
using CoderCampsCRM.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CoderCampsCRM.API
{
    public class ContactFilterViewController : ApiController
    {
        private IContactListViewRepository _repo;

        public ContactFilterViewController(IContactListViewRepository repo)
        {
            _repo = repo;
        }

        [HttpPost]
        public IHttpActionResult PostFilteredContacts(ContactFilterViewModel vm)
        {
            return Ok(_repo.GetFilteredContacts(vm));
        }
    }
}
