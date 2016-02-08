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
    public class DealsController : ApiController
    {
        private IGenericRepository _genRepo;

        public DealsController(IGenericRepository genRepo)
        {
            _genRepo = genRepo;
        }

        public IHttpActionResult GetDeals()
        {
            var dealData = _genRepo.Query<Deal>();
            return Ok(dealData);

        }

        public IHttpActionResult GetADeal(int id)
        {
            var dealData = _genRepo.Find<Deal>();
            return Ok(dealData);
        }

        [Route("api/deals/company/{id}")]
        public IHttpActionResult GetDealsByCompanyId(int id)
        {
            var dealData = _genRepo.Query<Deal>().Where(d => d.CompanyId == id);
            return Ok(dealData);
        }

        [Route("api/deals/deal-owner/{id}")]
        public IHttpActionResult GetDealsByOwnerId(int id)
        {
            var dealData = _genRepo.Query<Deal>().Where(d => d.DealOwnerId == id);
            return Ok(dealData);
        }

        public IHttpActionResult PostDeal(Deal dealToAdd)
        {
            if (ModelState.IsValid)
            {

                if (dealToAdd.Id == 0)
                {
                    _genRepo.Add<Deal>(dealToAdd);
                    _genRepo.SaveChanges();
                    return Ok();
                }
                else
                {
                    Deal dealBeingEditted = _genRepo.Find<Deal>(dealToAdd.Id);
                    dealBeingEditted.DealName = dealToAdd.DealName;
                    dealBeingEditted.Stage = dealToAdd.Stage;
                    dealBeingEditted.Amount = dealToAdd.Amount;
                    dealBeingEditted.CloseDate = dealToAdd.CloseDate;
                    dealBeingEditted.DealOwnerId = dealToAdd.DealOwnerId;
                    dealBeingEditted.CompanyId = dealToAdd.CompanyId;
                    _genRepo.SaveChanges();
                    return Ok();
                }
            }
            return BadRequest(ModelState);
        }

        public IHttpActionResult DeleteDeal(int id)
        {
            _genRepo.Delete<Deal>(id);
            _genRepo.SaveChanges();
            return Ok();
        }
    }

   
}
