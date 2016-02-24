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
    [Authorize]
    public class InteractionsController : ApiController
    {
        IGenericRepository _repo;

        public InteractionsController(IGenericRepository repo)
        {
            _repo = repo;
        }

        public IHttpActionResult addInteraction(ContactInteraction interaction)
        {
            if (ModelState.IsValid)
            {
                if (interaction.Id == 0)
                {
                    interaction.CreatedOn = DateTime.Now;
                    var dto = new DateTimeOffset(interaction.Date);
                    interaction.Date = dto.DateTime;
                    var contact = _repo.Find<Contact>(interaction.ContactId);
                    contact.LastInteraction = interaction.Date;
                    _repo.Add(interaction);
                    _repo.SaveChanges();
                    return Ok();
                }
                else
                {
                    var original = _repo.Find<ContactInteraction>(interaction.Id);
                    original.Id = interaction.Id;
                    original.Subject = interaction.Subject;
                    original.Description = interaction.Description;
                    original.Date = interaction.Date;
                    original.ContactId = interaction.ContactId;
                    original.Contact = interaction.Contact;
                    _repo.SaveChanges();
                    return Ok();
                }              
            }
            return BadRequest();
        }

        public IHttpActionResult getInteractions()
        {
            return Ok(_repo.Query<ContactInteraction>().ToList());
        }

        public IHttpActionResult getInteraction(int id)
        {
            return Ok(_repo.Find<ContactInteraction>(id));
        }

        public IHttpActionResult deleteInteraction(int id)
        {
            _repo.Find<ContactInteraction>(id);
            _repo.Delete<ContactInteraction>(id);
            _repo.SaveChanges();
            return Ok();
        }
    }
}
