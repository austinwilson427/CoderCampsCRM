using CoderCampsCRM.Models;
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
    public class ContactListViewController : ApiController
    {
        private IContactListViewRepository _repo;

        public ContactListViewController(IContactListViewRepository repo)
        {
            _repo = repo;
        }

        [Authorize]
        public IHttpActionResult GetContactListViewModel()
        {
            var userId = this.User.Identity.GetUserId();
            return Ok(_repo.GetContactListViewModel(userId));
        }
    }
}
