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

        [Route("api/deals/pag/{takeCount}/{skipCount}/{order}/{orderDirection}")]
        public IHttpActionResult GetDealsByPagNumber(int takeCount, int skipCount, string order, string orderDirection)
        {
            var dealData = _dealRepo.getDealViewModelsPag(takeCount, skipCount, order, orderDirection);
            return Ok(dealData.DealList);

        }

        public IHttpActionResult GetADealViewModel(int id)
        {
            var data = _dealRepo.getDealViewModel(id);
            if(data == null)
            {
                return NotFound();
            }

            return Ok(data.Deal);
        }

        public IHttpActionResult PostDeal(Deal dealToAdd)
        {
            if (ModelState.IsValid)
            {

                if (dealToAdd.Id == 0)
                {
                    _genRepo.Add<Deal>(dealToAdd);
                    _genRepo.SaveChanges();
                    return Ok(dealToAdd);
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
                    return Ok(dealToAdd);
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

        [Route("api/deals/deal-owner/{id}")]
        public IHttpActionResult GetDealsByOwnerId(int id)
        {
            var dealData = _genRepo.Query<Deal>().Where(d => d.ContactId == id);
            return Ok(dealData);
        }

    }

   
}
