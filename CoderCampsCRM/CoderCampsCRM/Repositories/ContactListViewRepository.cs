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

        public ContactListViewModel GetFilteredContacts(ContactFilterViewModel vm)
        {
            var contactsDeals = _repo.Query<DealContact>().Where(d => d.DealId == vm.DealId).Select(c => c.Contact).ToList();
            var contactsCompanies = _repo.Query<Contact>().Where(c => c.CompanyId == vm.CompanyId).ToList();
            var contactsTasks = _repo.Query<TaskContact>().Where(t => t.TaskId == vm.TaskId).Select(c => c.Contact).ToList();
            //var combine1 = contacts.Intersect(contacts2).Intersect(contacts3).ToList();
            var contactsFiltered = new List<Contact>();

            if (vm.DealId != 0)
            {
                if (vm.CompanyId != 0)
                {
                    if (vm.TaskId != 0)
                    {
                        contactsFiltered = contactsDeals.Intersect(contactsDeals).Intersect(contactsCompanies).Intersect(contactsTasks).ToList();
                    }
                    else
                    {
                        contactsFiltered = contactsDeals.Intersect(contactsDeals).Intersect(contactsCompanies).ToList();
                    }
                }
                else if (vm.TaskId != 0)
                {
                    contactsFiltered = contactsDeals.Intersect(contactsDeals).Intersect(contactsTasks).ToList();
                }
                else
                {
                    contactsFiltered = _repo.Query<DealContact>().Where(d => d.DealId == vm.DealId).Select(c => c.Contact).ToList();
                }
            }
            else if (vm.TaskId != 0)
            {
                if (vm.CompanyId != 0)
                {
                    if (vm.DealId != 0)
                    {
                        contactsFiltered = contactsTasks.Intersect(contactsTasks).Intersect(contactsCompanies).Intersect(contactsDeals).ToList();
                    }
                    else
                    {
                        contactsFiltered = contactsTasks.Intersect(contactsTasks).Intersect(contactsCompanies).ToList();
                    }
                }
                else if (vm.DealId != 0)
                {
                    contactsFiltered = contactsTasks.Intersect(contactsTasks).Intersect(contactsDeals).ToList();
                }
                else
                {
                    contactsFiltered = _repo.Query<TaskContact>().Where(t => t.TaskId == vm.TaskId).Select(c => c.Contact).ToList();
                }
            }
            else if (vm.CompanyId != 0)
            {
                if (vm.TaskId != 0)
                {
                    if (vm.DealId != 0)
                    {
                        contactsFiltered = contactsCompanies.Intersect(contactsCompanies).Intersect(contactsTasks).Intersect(contactsDeals).ToList();
                    }
                    else
                    {
                        contactsFiltered = contactsCompanies.Intersect(contactsCompanies).Intersect(contactsTasks).ToList();
                    }
                }
                else if (vm.DealId != 0)
                {
                    contactsFiltered = contactsCompanies.Intersect(contactsCompanies).Intersect(contactsDeals).ToList();
                }
                else
                {
                    contactsFiltered = _repo.Query<Contact>().Where(c => c.CompanyId == vm.CompanyId).ToList();
                }
            }

            var deals = _repo.Query<Deal>().ToList();
            var companies = _repo.Query<Company>().ToList();
            var tasks = _repo.Query<UserTask>().ToList();
            var interactions = _repo.Query<ContactInteraction>().ToList();

            var contactListViewModel = new ContactListViewModel
            {
                Companies = companies,
                Contacts = contactsFiltered,
                Deals = deals,
                Interactions = interactions,
                Tasks = tasks,
            };

            return contactListViewModel;
        }
    }
}