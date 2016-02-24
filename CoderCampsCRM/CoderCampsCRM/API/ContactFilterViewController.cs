using CoderCampsCRM.Models.ViewModels;
using CoderCampsCRM.Repositories;
using Microsoft.AspNet.Identity;
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

        [Authorize]
        [HttpPost]
        public IHttpActionResult PostFilteredContacts(ContactFilterViewModel vm)
        {
            var userId = this.User.Identity.GetUserId();
            return Ok(_repo.GetFilteredContacts(vm, userId));
        }
    }
}
