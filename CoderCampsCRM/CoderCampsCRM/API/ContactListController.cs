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
    public class ContactListController : ApiController
    {
        public IGenericRepository _repo;

        public ContactListController(IGenericRepository repo)
        {
            this._repo = repo;
        }

        public IHttpActionResult getAllContacts()
        {
            return Ok(_repo.Query<Contact>().ToList());
        }

        public IHttpActionResult getOneContact(int id)
        {
            return Ok(_repo.Find<Contact>(id));
        }

        public IHttpActionResult addContact(Contact contact)
        {
            if (ModelState.IsValid)
            {
                if (contact.Id == 0)
                {
                    var userId = this.User.Identity.GetUserId();
                    contact.UserId = userId;
                    _repo.Add(contact);
                    _repo.SaveChanges();
                    return Ok();
                }
                else
                {
                    var original = _repo.Find<Contact>(contact.Id);
                    original.Id = contact.Id;
                    original.UserId = contact.UserId;
                    original.Name = contact.Name;
                    original.JobTitle = contact.JobTitle;
                    original.PhoneNumber = contact.PhoneNumber;
                    original.CompanyId = contact.CompanyId;
                    original.UserId = contact.UserId;
                    original.City = contact.City;
                    original.Country = contact.Country;
                    original.LastInteraction = contact.LastInteraction;
                    original.State = contact.State;
                    original.StreetAddress = contact.StreetAddress;
                    original.Zip = contact.Zip;
                    original.Notes = contact.Notes;
                    original.Longitude = contact.Longitude;
                    original.Latitude = contact.Latitude;
                    _repo.SaveChanges();
                    return Ok();
                }
            }
            return BadRequest();
        }

        public IHttpActionResult deleteContact(int id)
        {
            _repo.Find<Contact>(id);
            _repo.Delete<Contact>(id);
            _repo.SaveChanges();
            return Ok();
        }
    }
}
