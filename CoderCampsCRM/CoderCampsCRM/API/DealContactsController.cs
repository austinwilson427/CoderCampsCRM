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
            var dealContactData = _dealRepo.getAllDealContacts();
            return Ok(dealContactData.DealContactsList);
        }

        public IHttpActionResult GetAllDealContactsByDealId(int id)
        {
            var dealContactData = _dealRepo.getAllDealContactsByDealId(id);
            return Ok(dealContactData.DealContactsList);
        }

        public IHttpActionResult PostDealContact(DealContact dealContactToAdd)
        {
            if (ModelState.IsValid)
            {

                if (dealContactToAdd.Id == 0)
                {
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
            _genRepo.Delete<DealContact>(id);
            _genRepo.SaveChanges();
            return Ok();
        }
    }
}
