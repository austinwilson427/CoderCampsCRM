using CoderCampsCRM.Models;

namespace CoderCampsCRM.Repositories
{
    public interface IDealRepository
    {
        DealViewModel getAllDealContacts(int id);
        DealViewModel getAllDealContactsByDealId(int id);
        DealViewModel getAllDealLogItemsViewModels();
        DealViewModel getAllDealSharersByDealId(int id);
        DealViewModel getAllDealsSharedByContactEmail(string email);
        DealViewModel getAllDealViewModels(string id);
        DealViewModel getDealLogItemViewModel(int id);
        DealViewModel getDealLogItemViewModelByDealId(int id);
        DealViewModel getDealViewModel(int id);
        DealViewModel getDealViewModelsPag(int takeCount, int skipCount, string order, string orderDirection);
    }
}