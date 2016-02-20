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
        public IHttpActionResult GetDealsOwned()
        {
            var userId = this.User.Identity.GetUserId();
            var contactData = _dashRepo.getAllContacts(userId);
            if (userId == null)
            {
                //return Unauthorized();
            }
            return Ok(contactData);
        }
    }
}
