using CoderCampsCRM.Models;
using CoderCampsCRM.Models.ViewModels;
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
    
    public class DealsController : ApiController
    {
        private IGenericRepository _genRepo;
        private IDealRepository _dealRepo;

        public DealsController(IGenericRepository genRepo, IDealRepository dealRepo)
        {
            _genRepo = genRepo;
            _dealRepo = dealRepo;
        }

        [Route("api/deals/owned")]
        public IHttpActionResult GetDealsOwned()
        {
            var userId = this.User.Identity.GetUserId();
            var dealData = _dealRepo.getAllDealViewModels(userId);
            if (userId == null)
            {
                return Unauthorized();
            }
            return Ok(dealData.DealList);
        }

        [Route("api/deals/shared")]
        public IHttpActionResult GetDealsShared()
        {
            var userId = this.User.Identity.GetUserId();
            var userInfo = _genRepo.Query<ApplicationUser>().Where(a => a.Id == userId).FirstOrDefault();
            var contactInfo = _genRepo.Query<Contact>().Where(c => c.Email == userInfo.Email).FirstOrDefault();

            if (contactInfo == null)
            {
                return Ok();
            }

            var dealContactData = _dealRepo.getAllDealsSharedByContactEmail(userInfo.Email);

            if (userId == null || userInfo.Email != contactInfo.Email || contactInfo.Email == null)
            {
                return Unauthorized();
            }

            return Ok(dealContactData.DealContactsList);
        }

        [Route("api/deals/pag/{takeCount}/{skipCount}/{order}/{orderDirection}")]
        public IHttpActionResult GetDealsByPagNumber(int takeCount, int skipCount, string order, string orderDirection)
        {
            var dealData = _dealRepo.getDealViewModelsPag(takeCount, skipCount, order, orderDirection);
            return Ok(dealData.DealList);

        }

        [Route("api/deals/owned/{id}")]
        public IHttpActionResult GetADealOwned(int id)
        {
            var userId = this.User.Identity.GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }
            var data = _dealRepo.getDealViewModel(id);
            if(data.Deal == null)
            {
                return Unauthorized();
            }
            if (data.Deal.UserId != userId)
            {
                return Unauthorized();
            }

            if (data.Deal == null)
            {
                return NotFound();
            }

            return Ok(data.Deal);
        }

        [Route("api/deals/shared/{id}")]
        public IHttpActionResult GetADealShared(int id)
        {
            var userId = this.User.Identity.GetUserId();
            var userInfo = _genRepo.Query<ApplicationUser>().Where(a => a.Id == userId).FirstOrDefault();
            var contactInfo = _genRepo.Query<Contact>().Where(c => c.Email == userInfo.Email).FirstOrDefault();

            if(contactInfo == null)
            {
                return Ok();
            }

            var dealContact = _genRepo.Query<DealContact>().Where(dc => dc.ContactEmail == userInfo.Email && dc.DealId == id && dc.isDealSharer == true).FirstOrDefault();

            if (dealContact == null || userId == null)
            {
                return Unauthorized();
            }

            var data = _dealRepo.getDealViewModel(id);

            if (data.Deal == null)
            {
                return NotFound();
            }

            return Ok(data.Deal);
        }

        [Route("api/deals/owned")]
        public IHttpActionResult PostDeal(Deal dealToAdd)
        {
            var userId = this.User.Identity.GetUserId();
            dealToAdd.UserId = userId;
            var user = _genRepo.Query<ApplicationUser>().Where(a => a.Id == userId).FirstOrDefault();

            if(userId == null)
            {
                return Unauthorized();
            }

            if (ModelState.IsValid)
            {

                if (dealToAdd.Id == 0)
                {
                    dealToAdd.CreatedOn = DateTime.Now;
                    _genRepo.Add<Deal>(dealToAdd);
                    _genRepo.SaveChanges();
                    return Ok(dealToAdd);
                }
                else
                {
                    var dealContact = _genRepo.Query<DealContact>().Where(dc => dc.ContactEmail == user.Email && dc.DealId == dealToAdd.Id && dc.isDealSharer == true).FirstOrDefault();

                    Deal dealBeingEditted = _genRepo.Find<Deal>(dealToAdd.Id);

                    if (dealContact == null && dealBeingEditted.UserId != userId)
                    {
                        return Unauthorized();
                    }

                    dealBeingEditted.DealName = dealToAdd.DealName;
                    dealBeingEditted.Stage = dealToAdd.Stage;
                    dealBeingEditted.Amount = dealToAdd.Amount;
                    dealBeingEditted.CloseDate = dealToAdd.CloseDate;
                    dealBeingEditted.ContactId = dealToAdd.ContactId;
                    dealBeingEditted.CompanyId = dealToAdd.CompanyId;
                    dealBeingEditted.isArchived = dealToAdd.isArchived;
                    _genRepo.SaveChanges();
                    return Ok(dealToAdd);
                }
            }
            return BadRequest(ModelState);
        }

        [Route("api/deals/owned/{id}")]
        public IHttpActionResult DeleteDeal(int id)
        {
            Deal dealBeingDeleted = _genRepo.Find<Deal>(id);
            var userId = this.User.Identity.GetUserId();
            if (userId == null || dealBeingDeleted.UserId != userId)
            {
                return Unauthorized();
            }
            _genRepo.Delete<Deal>(id);
            _genRepo.SaveChanges();
            return Ok();
        }

        [Route("api/deals/deal-owner/{id}")]
        public IHttpActionResult GetDealsByOwnerId(int id)
        {
            var dealData = _genRepo.Query<Deal>().Where(d => d.ContactId == id);
            return Ok(dealData);
        }

    }

   
}
