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
    public class DealLogItemsController : ApiController
    {
        private IGenericRepository _genRepo;
        private IDealRepository _dealRepo;

        public DealLogItemsController(IGenericRepository genRepo, IDealRepository dealRepo)
        {
            _genRepo = genRepo;
            _dealRepo = dealRepo;
        }

        public IHttpActionResult GetDealLogItems()
        {
            var dealLogData = _dealRepo.getAllDealLogItemsViewModels();
            return Ok(dealLogData.DealLogItemsList);
        }

        public IHttpActionResult GetADealLogItem(int id)
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

            if (dealOwner == null && dealSharer == null)
            {
                return Unauthorized();
            }

            var dealData = _dealRepo.getDealLogItemViewModel(id);

            if (dealData == null)
            {
                return NotFound();
            }

            return Ok(dealData.DealLogItem);
        }

        public IHttpActionResult PostDealLogItem(DealLogItem logItemToAdd)
        {
            var userId = this.User.Identity.GetUserId();
            var user = _genRepo.Query<ApplicationUser>().Where(a => a.Id == userId).FirstOrDefault();
            var fullName = user.FirstName + " " + user.LastName;

            if (userId == null)
            {
                return null;
            }

            if (ModelState.IsValid)
            {
                if (logItemToAdd.Id == 0)
                {
                    logItemToAdd.UserId = userId;
                    logItemToAdd.CreatedOn = DateTime.Now;
                    logItemToAdd.SubmittedBy = fullName;
                    _genRepo.Add<DealLogItem>(logItemToAdd);
                    _genRepo.SaveChanges();
                    return Ok(logItemToAdd);
                }
                else
                {
                    DealLogItem logItemBeingEditted = _genRepo.Find<DealLogItem>(logItemToAdd.Id);
                    if (logItemBeingEditted.SubmittedBy != fullName)
                    {
                        return Unauthorized();
                    }
                    logItemBeingEditted.Type = logItemToAdd.Type;
                    logItemBeingEditted.StartTime = logItemToAdd.StartTime;
                    logItemBeingEditted.EndTime = logItemToAdd.EndTime;
                    logItemBeingEditted.Content = logItemToAdd.Content;
                    logItemBeingEditted.ContactId = logItemToAdd.ContactId;
                    logItemBeingEditted.DealId = logItemToAdd.DealId;

                    _genRepo.SaveChanges();
                    return Ok(logItemToAdd);
                }
            }
            return BadRequest(ModelState);
        }

        public IHttpActionResult DeleteDealLogItem(int id)
        {
            var dataToDelete = _genRepo.Query<DealLogItem>().Where(dl => dl.DealId == id).ToList();

            for (var i = 0; i < dataToDelete.Count; i++)
            {
                _genRepo.Delete<DealLogItem>(dataToDelete[i].Id);
            }
            _genRepo.SaveChanges();
            return Ok();

        }
        //else
        //{
        //    _genRepo.Delete<DealLogItem>(id);
        //    _genRepo.SaveChanges();
        //    return Ok();
        //}



        [Route("api/deallogitems/deal/{id}")]
        public IHttpActionResult GetDealLogItemsByDealId(int id)
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

            if (dealOwner == null && dealSharer == null)
            {
                return Unauthorized();
            }

            var dealData = _dealRepo.getDealLogItemViewModelByDealId(id);
            //var dealData = _genRepo.Query<DealLogItem>().Where(d => d.DealId == id);
            return Ok(dealData.DealLogItemsList);
        }



    }
}
