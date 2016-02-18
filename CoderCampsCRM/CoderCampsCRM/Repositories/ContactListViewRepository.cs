using CoderCampsCRM.Models;
using CoderCampsCRM.Models.ViewModels;
using CoderCampsCRM.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
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

        public ContactListViewModel GetContactListViewModel()
        {
            //var contacts = _repo.Query<Contact>().Where(c => c.UserId == User.Id).ToList();
            var contacts = _repo.Query<Contact>().ToList();
            //var deals = _repo.Query<Deal>().Where(d => d.UserId == User.Id).ToList();
            var deals = _repo.Query<Deal>().ToList();
            //var tasks = _repo.Query<Task>().Where(t => t.UserId == User.Id).ToList();
            var tasks = _repo.Query<UserTask>().ToList();
            var companies = _repo.Query<Company>().ToList();
            //var companies = _repo.Query<Company>().Where(co => co.userId == User.Id).ToList();
            var interactions = _repo.Query<ContactInteraction>().ToList();

            var contactListViewModel = new ContactListViewModel
            {
                Companies = companies,
                Contacts = contacts,
                Deals = deals, 
                Interactions = interactions,               
                Tasks = tasks,
            };

            return contactListViewModel;
        }

        public ContactListViewModel GetContactCompaniesViewModel(int id)
        {
            var deals = _repo.Query<Deal>().ToList();
            var companies = _repo.Query<Company>().ToList();
            var tasks = _repo.Query<UserTask>().ToList();
            var interactions = _repo.Query<ContactInteraction>().ToList();
            var contacts = _repo.Query<Contact>().Where(c => c.CompanyId == id).ToList();

            var contactCompaniesViewModel = new ContactListViewModel
            {
                Companies = companies,
                Contacts = contacts,
                Deals = deals,
                Interactions = interactions,
                Tasks = tasks,
            };

            return contactCompaniesViewModel;
        }

        public ContactListViewModel GetContactDealsViewModel(int id)
        {
            var deals = _repo.Query<Deal>().ToList();
            var companies = _repo.Query<Company>().ToList();
            var tasks = _repo.Query<UserTask>().ToList();
            var interactions = _repo.Query<ContactInteraction>().ToList();
            //var contacts = _db.DealContacts.Where(d => d.DealId == id).Select(c => c.Contact).ToList();
            var contacts = _repo.Query<DealContact>().Where(d => d.DealId == id).Select(c => c.Contact).ToList();
            //var locations = _repo.Query<LocationContact>().Where(l => l.DealId == id).Select(l => l.Location).ToList();
            var contactDealsViewModel = new ContactListViewModel
            {
                Companies = companies,
                Contacts = contacts,
                Deals = deals,
                Interactions = interactions,
                Tasks = tasks,
            };

            return contactDealsViewModel;
        }

        public ContactListViewModel GetContactTasksViewModel(int id)
        {
            var deals = _repo.Query<Deal>().ToList();
            var companies = _repo.Query<Company>().ToList();
            var tasks = _repo.Query<UserTask>().ToList();
            var contacts = _repo.Query<TaskContact>().Where(t => t.TaskId == id).Select(c => c.Contact).ToList();
            var interactions = _repo.Query<ContactInteraction>().ToList();
            //var locations = _repo.Query<LocationContact>().Where(l => l.TaskId == id).Select(l => l.Location).ToList();

            var contactTasksViewModel = new ContactListViewModel
            {
                Companies = companies,
                Contacts = contacts,
                Deals = deals,
                Interactions = interactions,
                Tasks = tasks,
            };

            return contactTasksViewModel;
        }
    }
}