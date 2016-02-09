using CoderCampsCRM.Models;
using CoderCampsCRM.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoderCampsCRM.Repositories
{
    public class ContactListViewRepository : IContactListViewRepository
    {
        private IGenericRepository _repo;

        public ContactListViewRepository(IGenericRepository repo)
        {
            _repo = repo;
        }

        public ContactListViewModel getContactListViewModel()
        {
            //var contacts = _repo.Query<Contact>().Where(c => c.UserId == User.Id).ToList();
            var contacts = _repo.Query<Contact>().ToList();
            //var deals = _repo.Query<Deal>().Where(d => d.UserId == User.Id).ToList();
            var deals = _repo.Query<Deal>().ToList();
            //var tasks = _repo.Query<Task>().Where(t => t.UserId == User.Id).ToList();
            //var tasks = _repo.Query<Task>().ToList();
            var companies = _repo.Query<Company>().ToList();
            //var companies = _repo.Query<Company>().Where(co => co.userId == User.Id).ToList();

            var contactListViewModel = new ContactListViewModel
            {
                Companies = companies,
                Contacts = contacts,
                Deals = deals,
                //Tasks = tasks
            };

            return contactListViewModel;
        }
    }
}