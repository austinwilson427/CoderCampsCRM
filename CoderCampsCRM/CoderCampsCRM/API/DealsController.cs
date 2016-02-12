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
    public class DealsController : ApiController
    {
        private IGenericRepository _genRepo;
        private IDealRepository _dealRepo;

        public DealsController(IGenericRepository genRepo, IDealRepository dealRepo)
        {
            _genRepo = genRepo;
            _dealRepo = dealRepo;
        }

        public IHttpActionResult GetDeals()
        {
            var dealData = _dealRepo.getAllDealViewModels();
            return Ok(dealData.DealList);

        }

        public IHttpActionResult GetADealViewModel(int id)
        {
            var data = _dealRepo.getDealViewModel(id);
            return Ok(data.Deal);
        }

        [Route("api/deals/company/{id}")]
        public IHttpActionResult GetAViewModel(int id)
        {
            var data = _dealRepo.getDealViewModel(id);
            return Ok(data.Deal);
        }

        [Route("api/deals/deal-owner/{id}")]
        public IHttpActionResult GetDealsByOwnerId(int id)
        {
            var dealData = _genRepo.Query<Deal>().Where(d => d.ContactId == id);
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
                    dealBeingEditted.ContactId = dealToAdd.ContactId;
                    dealBeingEditted.CompanyId = dealToAdd.CompanyId;
                    dealBeingEditted.isArchived = dealToAdd.isArchived;
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
