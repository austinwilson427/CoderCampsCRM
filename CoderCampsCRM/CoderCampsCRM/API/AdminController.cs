using CoderCampsCRM.Models;
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
    public class AdminController : ApiController
    {
        private IGenericRepository _repo;

        public AdminController(IGenericRepository repo)
        {
            _repo = repo;
        }

        [Authorize]
        public IHttpActionResult GetApplicationUsers()
        {
            var applicationUsers = _repo.Query<ApplicationUser>().ToList();
            return Ok(applicationUsers);
        }
    }
}
