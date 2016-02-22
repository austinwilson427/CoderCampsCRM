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
    public class DealContactsController : ApiController
    {
        private IGenericRepository _genRepo;
        private IDealRepository _dealRepo;

        public DealContactsController(IGenericRepository genRepo, IDealRepository dealRepo)
        {
            _genRepo = genRepo;
            _dealRepo = dealRepo;
        }

        public IHttpActionResult GetAllDealContacts()
        {
            var userId = this.User.Identity.GetUserId();
            var userInfo = _genRepo.Query<ApplicationUser>().Where(a => a.Id == userId).FirstOrDefault();
            var contactInfo = _genRepo.Query<Contact>().Where(c => c.Email == userInfo.Email).FirstOrDefault();

            var dealContactData = _dealRepo.getAllDealContacts(contactInfo.Id);

            if (userId == null || userInfo.Email != contactInfo.Email)
            {
                return Unauthorized();
            }

            return Ok(dealContactData.DealList);

        }

        public IHttpActionResult GetAllDealContactsByDealId(int id)
        {
            var userId = this.User.Identity.GetUserId();
            var userInfo = _genRepo.Query<ApplicationUser>().Where(a => a.Id == userId).FirstOrDefault();
            var contactInfo = _genRepo.Query<Contact>().Where(c => c.Email == userInfo.Email).FirstOrDefault();

            var dealOwner = _genRepo.Query<Deal>().Where(d => d.UserId == userId && d.Id == id).FirstOrDefault();

            DealContact dealSharer;
            if (contactInfo == null)
            {
                dealSharer = null;
            }
            else
            {
                dealSharer = _genRepo.Query<DealContact>().Where(d => d.ContactId == contactInfo.Id && d.isDealSharer == true && d.DealId == id).FirstOrDefault();
            }

            if (dealOwner == null && dealSharer == null)
            {
                return Unauthorized();
            }

            var dealContactData = _dealRepo.getAllDealContactsByDealId(id);

            return Ok(dealContactData.DealContactsList);
        }

        [Route("api/dealcontacts/share/{id}")]
        public IHttpActionResult GetAllDealSharersByDealId(int id)
        {
            var userId = this.User.Identity.GetUserId();
            var userInfo = _genRepo.Query<ApplicationUser>().Where(a => a.Id == userId).FirstOrDefault();
            var contactInfo = _genRepo.Query<Contact>().Where(c => c.Email == userInfo.Email).FirstOrDefault();

            DealContact dealSharer;
            if (contactInfo == null)
            {
                dealSharer = null;
            }
            else
            {
                dealSharer = _genRepo.Query<DealContact>().Where(d => d.ContactId == contactInfo.Id && d.isDealSharer == true && d.DealId == id).FirstOrDefault();
            }

            var dealOwner = _genRepo.Query<Deal>().Where(d => d.UserId == userId && d.Id == id).FirstOrDefault();

            if ((dealOwner == null && dealSharer == null) || userId == null)
            {
                return Unauthorized();
            }
            var dealContactData = _dealRepo.getAllDealSharersByDealId(id);
            return Ok(dealContactData.DealContactsList);
        }

        public IHttpActionResult PostDealContact(DealContact dealContactToAdd)
        {
            var userId = this.User.Identity.GetUserId();
            var userInfo = _genRepo.Query<ApplicationUser>().Where(a => a.Id == userId).FirstOrDefault();
            var contactInfo = _genRepo.Query<Contact>().Where(c => c.Email == userInfo.Email).FirstOrDefault();

            var dealOwner = _genRepo.Query<Deal>().Where(d => d.UserId == userId && d.Id == dealContactToAdd.DealId).FirstOrDefault();

            DealContact dealSharer;
            if (contactInfo == null)
            {
                dealSharer = null;
            }
            else
            {
                dealSharer = _genRepo.Query<DealContact>().Where(d => d.ContactId == contactInfo.Id && d.isDealSharer == true && d.DealId == dealContactToAdd.DealId).FirstOrDefault();
            }


            if ((dealOwner == null && dealSharer == null) || userId == null)
            {
                return Unauthorized();
            }


            if (ModelState.IsValid)
            {

                if (dealContactToAdd.Id == 0)
                {
                    dealContactToAdd.CreatedOn = DateTime.Now;
                    dealContactToAdd.UserId = userId;
                    _genRepo.Add<DealContact>(dealContactToAdd);
                    _genRepo.SaveChanges();
                    return Ok();
                }
                else
                {
                    DealContact dealContactBeingEditted = _genRepo.Find<DealContact>(dealContactToAdd.Id);
                    dealContactToAdd.ContactId = dealContactToAdd.ContactId;
                    dealContactToAdd.DealId = dealContactToAdd.DealId;
                    _genRepo.SaveChanges();
                    return Ok();
                }
            }
            return BadRequest(ModelState);
        }

        public IHttpActionResult DeleteDealContact(int id)
        {
            var userId = this.User.Identity.GetUserId();
            var userInfo = _genRepo.Query<ApplicationUser>().Where(a => a.Id == userId).FirstOrDefault();
            var contactInfo = _genRepo.Query<Contact>().Where(c => c.Email == userInfo.Email).FirstOrDefault();

            DealContact dealContactBeingDeleted = _genRepo.Find<DealContact>(id);

            DealContact dealSharer;
            if (contactInfo == null)
            {
                dealSharer = null;
            }
            else
            {
                dealSharer = _genRepo.Query<DealContact>().Where(d => d.ContactId == contactInfo.Id && d.isDealSharer == true && d.DealId == dealContactBeingDeleted.DealId).FirstOrDefault();
            }
            var dealOwner = _genRepo.Query<Deal>().Where(d => d.UserId == userId && d.Id == dealContactBeingDeleted.DealId).FirstOrDefault();

            if ((dealOwner == null && dealSharer == null) || userId == null)
            {
                return Unauthorized();
            }
            _genRepo.Delete<DealContact>(id);
            _genRepo.SaveChanges();
            return Ok();
        }
    }
}
