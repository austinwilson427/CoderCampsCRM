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

        
    }
}