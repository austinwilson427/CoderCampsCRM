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
    public class LocationsController : ApiController
    {
        IGenericRepository _repo;

        public LocationsController(IGenericRepository repo)
        {
            this._repo = repo;
        }

        //public IHttpActionResult Post(Location location)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        if (location.Id == 0)
        //        {
        //            _repo.Add(location);
        //            _repo.SaveChanges();
        //            return Ok();
        //        }
        //        else
        //        {
        //            var original = _repo.Find<Location>(location.Id);
        //            original.Id = location.Id;
        //            original.Latitude = location.Latitude;
        //            original.Longitude = location.Longitude;
        //            original.Title = location.Title;
        //            original.Zoom = location.Zoom;
        //            _repo.SaveChanges();
        //            return Ok();
        //        }               
        //    }
        //    return BadRequest();
        //}

        //public IHttpActionResult Get(int id)
        //{
        //    return Ok(_repo.Find<Location>(id));
            
        //}

        //public IHttpActionResult Get()
        //{
        //    return Ok(_repo.Query<Location>().ToList());
        //}
    }
}
