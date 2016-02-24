using CoderCampsCRM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoderCampsCRM.Repositories
{
    public class DashboardRepository : IDashboardRepository
    {
        private IGenericRepository _repo;
        
        public DashboardRepository(IGenericRepository repo)
        {
            this._repo = repo;
        }

        public List<Contact> getAllContacts(string id)
        {
            var contacts = _repo.Query<Contact>().Where(c => c.UserId == id).ToList();
            return contacts;
        }

        public List<Company> getAllCompanies(string id)
        {
            var companies = _repo.Query<Company>().Where(c => c.UserId == id).ToList();
            return companies;
        }

        public List<Deal> getAllDeals(string id)
        {
            var deals = _repo.Query<Deal>().Where(c => c.UserId == id).ToList();
            return deals;
        }

        public List<UserTask> getAllTasks(string id)
        {
            var tasks = _repo.Query<UserTask>().Where(c => c.UserId == id).ToList();
            return tasks;
        }

        public List<Quota> getAllQuotas(string id)
        {
            var quotas = _repo.Query<Quota>().Where(c => c.UserId == id).ToList();
            return quotas;
        }

    }
}