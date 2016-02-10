//using CoderCampsCRM.Models;
//using CoderCampsCRM.Repositories;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Web.Http;

//namespace CoderCampsCRM.API
//{
//    public class DealsViewController : ApiController
//    {
//        IDealRepository _repo;

//        public DealsViewController(IDealRepository repo)
//        {
//            this._repo = repo;
//        }


//        public IHttpActionResult GetADealViewModel(int id)
//        {
//            var data = _repo.getDealViewModel(id);


//            return Ok(data.Deal);
//        }
//    }
//}
