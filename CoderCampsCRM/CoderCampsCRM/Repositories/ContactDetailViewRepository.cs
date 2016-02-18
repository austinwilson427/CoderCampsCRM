using CoderCampsCRM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoderCampsCRM.Repositories
{
    public class ContactDetailViewRepository : IContactDetailViewRepository
    {
        private IGenericRepository _repo;

        public ContactDetailViewRepository(IGenericRepository repo)
        {
            this._repo = repo;
        }

        public ContactDetailViewModel getContactDetailViewModel(int id)
        {
            var contact = _repo.Query<Contact>().Where(c => c.Id == id).FirstOrDefault();
            var deals = _repo.Query<DealContact>().Where(d => d.ContactId == id).Select(d => d.Deal).ToList();
            var tasks = _repo.Query<TaskContact>().Where(t => t.ContactId == id).Select(t => t.UserTask).ToList();
            var company = _repo.Query<Company>().Where(co => co.Id == contact.CompanyId).FirstOrDefault();
            var interactions = _repo.Query<ContactInteraction>().Where(i => i.ContactId == id).ToList();
            //var location = _repo.Query<Location>().Where(l => l.ContactId == id).FirstOrDefault();
            var companies = _repo.Query<Company>().ToList();

            var contactDetailViewModel = new ContactDetailViewModel
            {
                Company = company,
                Contact = contact,
                Deals = deals,
                Companies = companies,
                Interactions = interactions,
                Tasks = tasks,
            };

            return contactDetailViewModel;
        }
    }
}