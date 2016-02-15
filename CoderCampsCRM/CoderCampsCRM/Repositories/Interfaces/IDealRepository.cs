using CoderCampsCRM.Models;

namespace CoderCampsCRM.Repositories
{
    public interface IDealRepository
    {
        DealViewModel getAllDealContacts();
        DealViewModel getAllDealContactsByDealId(int id);
        DealViewModel getAllDealLogItemsViewModels();
        DealViewModel getAllDealViewModels();
        DealViewModel getDealLogItemViewModel(int id);
        DealViewModel getDealLogItemViewModelByDealId(int id);
        DealViewModel getDealViewModel(int id);
    }
}