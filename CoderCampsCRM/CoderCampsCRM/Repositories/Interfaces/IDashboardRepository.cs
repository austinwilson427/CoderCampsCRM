using System.Collections.Generic;
using CoderCampsCRM.Models;

namespace CoderCampsCRM.Repositories
{
    public interface IDashboardRepository
    {
        List<Contact> getAllContacts(string id);
        List<Company> getAllCompanies(string id);
        List<Deal> getAllDeals(string id);
        List<UserTask> getAllTasks(string id);
        List<Quota> getAllQuotas(string id);
    }
}