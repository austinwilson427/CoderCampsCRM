using CoderCampsCRM.Models;

namespace CoderCampsCRM.Repositories
{
    public interface IDealRepository
    {
        DealViewModel getAllDealLogItemsViewModels();
        DealViewModel getAllDealViewModels();
        DealViewModel getDealLogItemViewModel(int id);
        DealViewModel getDealViewModel(int id);
    }
}