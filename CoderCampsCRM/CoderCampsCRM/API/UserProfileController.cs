using CoderCampsCRM.Models;
using CoderCampsCRM.Repositories;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace CoderCampsCRM.API
{
    public class UserProfileController : ApiController
    {
        private IGenericRepository _repo;

        public UserProfileController(IGenericRepository repo)
        {
            _repo = repo;
        }

        //public IHttpActionResult GetAllUsers()
        //{
        //    var data = _repo.Query<ApplicationUser>().ToList();

        //    var user = User.Identity as ClaimsIdentity;

        //    if (!user.HasClaim("Admin", "true"))
        //    {
        //        //return Unauthorized();
        //    }

        //    return Ok(data);
        //}

        public IHttpActionResult GetAUserById()
        {
            var userId = this.User.Identity.GetUserId();

            var data = _repo.Query<ApplicationUser>().Where(au => au.Id == userId).FirstOrDefault();

            if (userId == null)
            {
                return Unauthorized();
            }

            return Ok(data);
        }
    }
}
