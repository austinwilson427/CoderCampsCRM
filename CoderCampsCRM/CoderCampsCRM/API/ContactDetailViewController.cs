using CoderCampsCRM.Models;
using CoderCampsCRM.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CoderCampsCRM.API
{
    public class ContactDetailViewController : ApiController
    {
        IContactDetailViewRepository _repo;

        public ContactDetailViewController(IContactDetailViewRepository repo)
        {
            this._repo = repo;
        }

        [Authorize]
        public ContactDetailViewModel getContactDetailViewModel(int id)
        {
            return _repo.getContactDetailViewModel(id);
        }
    }
}
