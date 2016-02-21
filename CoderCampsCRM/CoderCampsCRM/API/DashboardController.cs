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
    public class DashboardController : ApiController
    {
        private IGenericRepository _genRepo;
        private IDashboardRepository _dashRepo;

        public DashboardController(IGenericRepository genRepo, IDashboardRepository dashRepo)
        {
            _genRepo = genRepo;
            _dashRepo = dashRepo;
        }

        [Route("api/dashboard/contacts")]
        public IHttpActionResult GetContactsOwned()
        {
            var userId = this.User.Identity.GetUserId();
            var contactData = _dashRepo.getAllContacts(userId);
            if (userId == null)
            {
                return Unauthorized();
            }
            return Ok(contactData);
        }

        [Route("api/dashboard/companies")]
        public IHttpActionResult GetCompaniesOwned()
        {
            var userId = this.User.Identity.GetUserId();
            var companyData = _dashRepo.getAllCompanies(userId);
            if (userId == null)
            {
                return Unauthorized();
            }
            return Ok(companyData);
        }

        [Route("api/dashboard/deals")]
        public IHttpActionResult GetDealsOwned()
        {
            var userId = this.User.Identity.GetUserId();
            var dealData = _dashRepo.getAllDeals(userId);
            if (userId == null)
            {
                return Unauthorized();
            }
            return Ok(dealData);
        }

        [Route("api/dashboard/tasks")]
        public IHttpActionResult GetTasksOwned()
        {
            var userId = this.User.Identity.GetUserId();
            var taskData = _dashRepo.getAllTasks(userId);
            if (userId == null)
            {
                return Unauthorized();
            }
            return Ok(taskData);
        }
    }
}
