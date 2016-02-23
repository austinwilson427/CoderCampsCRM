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
    public class CompanyLogItemsController : ApiController
    {
        private IGenericRepository _repo;
        private ICompanyRepository _companyRepo;

        public CompanyLogItemsController(IGenericRepository repo, ICompanyRepository companyRepo)
        {
            _repo = repo;
            _companyRepo = companyRepo;
        }

        public IHttpActionResult GetCompanyLogItems()
        {
            var companyLogData = _companyRepo.getAllDealLogItemsViewModels();
            //var dealLogData = _genRepo.Query<DealLogItem>();
            return Ok(companyLogData.CompanyLogItemsList);
        }

        public IHttpActionResult GetADealLogItem(int id)
        {
            var companyData = _companyRepo.getCompanyLogItemViewModel(id);
            //var dealData = _genRepo.Find<DealLogItem>();
            return Ok(companyData.CompanyLogItem);
        }

        [Route("api/companylogitems/company/{id}")]
        public IHttpActionResult GetCompanyLogItemsByDealId(int id)
        {
            var companyData = _companyRepo.getCompanyLogItemViewModelByCompanyId(id);
            //var dealData = _genRepo.Query<DealLogItem>().Where(d => d.DealId == id);
            return Ok(companyData.CompanyLogItemsList);
        }

        public IHttpActionResult PostCompanyLogItem(CompanyLogItem logItemToAdd)
        {
            if (ModelState.IsValid)
            {
                if (logItemToAdd.Id == 0)
                {
                    logItemToAdd.CreatedOn = DateTime.Now;
                    _repo.Add<CompanyLogItem>(logItemToAdd);
                    _repo.SaveChanges();
                    return Ok();
                }
                else
                {
                    CompanyLogItem logItemBeingEditted = _repo.Find<CompanyLogItem>(logItemToAdd.Id);
                    logItemBeingEditted.Type = logItemToAdd.Type;
                    logItemBeingEditted.StartTime = logItemToAdd.StartTime;
                    logItemBeingEditted.EndTime = logItemToAdd.EndTime;
                    logItemBeingEditted.Content = logItemToAdd.Content;
                    logItemBeingEditted.TaskId = logItemToAdd.TaskId;
                    //logItemBeingEditted.CompanyId = logItemToAdd.CompanyId;
                   

                    _repo.SaveChanges();
                    return Ok();
                }
            }
            return BadRequest(ModelState);
        }
    }
}
