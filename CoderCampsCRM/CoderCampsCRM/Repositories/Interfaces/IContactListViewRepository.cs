using CoderCampsCRM.Models.ViewModels;

namespace CoderCampsCRM.Repositories
{
    public interface IContactListViewRepository
    {
        ContactListViewModel getContactListViewModel();
    }
}