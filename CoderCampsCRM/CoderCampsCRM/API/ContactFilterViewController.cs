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

        [HttpGet]
        [Route("api/contactFilterView/filterByCompanies/{id}")]
        public IHttpActionResult GetFilteredByCompanies(int id)
        {
            return Ok(_repo.GetContactCompaniesViewModel(id));
        }

        [HttpGet]
        [Route("api/contactFilterView/filterByDeals/{id}")]
        public IHttpActionResult GetFilteredByDeals(int id)
        {
            return Ok(_repo.GetContactDealsViewModel(id));
        }

        [HttpGet]
        [Route("api/contactFilterView/filterByTasks/{id}")]
        public IHttpActionResult GetFilteredByTasks(int id)
        {
            return Ok(_repo.GetContactTasksViewModel(id));
        }
    }
}
