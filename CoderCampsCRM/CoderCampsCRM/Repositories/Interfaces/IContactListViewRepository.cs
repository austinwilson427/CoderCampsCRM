using CoderCampsCRM.Models.ViewModels;

namespace CoderCampsCRM.Repositories
{
    public interface IContactListViewRepository
    {
        ContactListViewModel GetContactCompaniesViewModel(int id);
        ContactListViewModel GetContactDealsViewModel(int id);
        ContactListViewModel GetContactListViewModel();
        ContactListViewModel GetContactTasksViewModel(int id);
    }
}