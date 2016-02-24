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
    public class ProfileController : ApiController
    {
        private IGenericRepository _repo;

        public ProfileController(IGenericRepository repo)
        {
            _repo = repo;
        }

        public IHttpActionResult GetAllUsers()
        {
            var userId = this.User.Identity.GetUserId();
            var user = _repo.Query<ApplicationUser>().Where(au => au.Id == userId).FirstOrDefault();
            return Ok(user);
        }

        public IHttpActionResult SaveUser(ApplicationUser userToSave)
        {
            if (ModelState.IsValid)
            {
                var userId = this.User.Identity.GetUserId();
                var user = _repo.Query<ApplicationUser>().Where(au => au.Id == userId).FirstOrDefault();
                ApplicationUser userToEdit = user;
                user.FirstName = userToSave.FirstName;
                user.LastName = userToSave.LastName;
                user.Email = userToSave.Email;
                user.IsActive = userToSave.IsActive;
                user.PicUrl = userToSave.PicUrl;
                _repo.SaveChanges();
                return Ok();

            }
            return BadRequest(ModelState);
        }

        

    }
}
