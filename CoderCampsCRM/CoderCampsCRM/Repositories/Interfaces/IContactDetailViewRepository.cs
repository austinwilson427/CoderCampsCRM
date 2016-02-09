using CoderCampsCRM.Models;

namespace CoderCampsCRM.Repositories
{
    public interface IContactDetailViewRepository
    {
        ContactDetailViewModel getContactDetailViewModel(int id);
    }
}