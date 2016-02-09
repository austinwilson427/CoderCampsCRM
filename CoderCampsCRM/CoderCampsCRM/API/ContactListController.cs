﻿using CoderCampsCRM.Models;
using CoderCampsCRM.Repositories;
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
                    _repo.Add(contact);
                    _repo.SaveChanges();
                    return Ok();
                }
                else
                {
                    var original = _repo.Find<Contact>(contact.Id);
                    original.Id = contact.Id;
                    original.Name = contact.Name;
                    original.JobTitle = contact.JobTitle;
                    original.PhoneNumber = contact.PhoneNumber;
                    original.CompanyId = contact.CompanyId;
                    original.UserId = contact.UserId;
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