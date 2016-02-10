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
            //var dealLogData = _genRepo.Query<DealLogItem>();
            return Ok(dealLogData.DealLogItemsList);
        }

        public IHttpActionResult GetADealLogItem(int id)
        {
            var dealData = _dealRepo.getDealLogItemViewModel(id);
            //var dealData = _genRepo.Find<DealLogItem>();
            return Ok(dealData.DealLogItem);
        }

        [Route("api/deallogitems/deal/{id}")]
        public IHttpActionResult GetDealLogItemsByDealId(int id)
        {
            var dealData = _genRepo.Query<DealLogItem>().Where(d => d.DealId == id);
            return Ok(dealData);
        }

        public IHttpActionResult PostDealLogItem(DealLogItem logItemToAdd)
        {
            if (!ModelState.IsValid)
            {

                if (logItemToAdd.Id == 0)
                {
                    _genRepo.Add<DealLogItem>(logItemToAdd);
                    _genRepo.SaveChanges();
                    return Ok();
                }
                else
                {
                    DealLogItem logItemBeingEditted = _genRepo.Find<DealLogItem>(logItemToAdd.Id);
                    logItemBeingEditted.Type = logItemToAdd.Type;
                    logItemBeingEditted.StartTime = logItemToAdd.StartTime;
                    logItemBeingEditted.EndTime = logItemToAdd.EndTime;
                    logItemBeingEditted.Content = logItemToAdd.Content;
                    logItemBeingEditted.TaskId = logItemToAdd.TaskId;
                    logItemBeingEditted.ContactId = logItemToAdd.ContactId;
                    logItemBeingEditted.DealId = logItemToAdd.DealId;

                    _genRepo.SaveChanges();
                    return Ok();
                }
            }
            return BadRequest(ModelState);
        }

        public IHttpActionResult DeleteDeal(int id)
        {
            _genRepo.Delete<DealLogItem>(id);
            _genRepo.SaveChanges();
            return Ok();
        }


    }
}
