using System.Collections.Generic;
using CoderCampsCRM.Models;

namespace CoderCampsCRM.Repositories
{
    public interface IDashboardRepository
    {
        List<Contact> getAllContacts(string id);
    }
}