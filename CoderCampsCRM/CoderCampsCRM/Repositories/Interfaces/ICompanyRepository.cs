using CoderCampsCRM.Models.ViewModels;

namespace CoderCampsCRM.Repositories
{
    public interface ICompanyRepository
    {
        CompanyViewModel getAllCompanyViewModels();
        CompanyViewModel getAllDealLogItemsViewModels();
        CompanyViewModel getCompanyLogItemViewModel(int id);
        CompanyViewModel getCompanyLogItemViewModelByCompanyId(int id);
        CompanyViewModel getCompanyViewModel(int id);
    }
}