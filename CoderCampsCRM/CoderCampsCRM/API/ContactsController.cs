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
    public class ContactsController : ApiController
    {
        public IGenericRepository _repo;

        public ContactsController(IGenericRepository repo)
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
                    _repo.Add(contact);
                    _repo.SaveChanges();
                    return Ok();
                }
                else
                {
                    var original = _repo.Find<Contact>(contact.Id);
                    original.Id = contact.Id;
                    original.Name = contact.Name;
                    original.Company = contact.Company;
                    original.JobTitle = contact.JobTitle;
                    original.PhoneNumber = contact.PhoneNumber;
                    return Ok();
                }
            }
            return BadRequest();
        }

        public IHttpActionResult deleteContact(int id)
        {
            _repo.Find<Contact>(id);
            _repo.SaveChanges();
            return Ok();
        }
    }
}
