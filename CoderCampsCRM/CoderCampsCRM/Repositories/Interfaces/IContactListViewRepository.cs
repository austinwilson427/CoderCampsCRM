using CoderCampsCRM.Models.ViewModels;

namespace CoderCampsCRM.Repositories
{
    public interface IContactListViewRepository
    {
        ContactListViewModel GetContactListViewModel(string id);
        ContactListViewModel GetFilteredContacts(ContactFilterViewModel vm, string userId);
    }
}