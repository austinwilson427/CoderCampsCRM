using CoderCampsCRM.Models;
using CoderCampsCRM.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoderCampsCRM.Repositories
{
    public class CompanyRepository : ICompanyRepository
    {
        private IGenericRepository _repo;

        public CompanyRepository(IGenericRepository repo)
        {
            this._repo = repo;
        }
  
        ///////////////CompanyLogItems///////////////
        //////////////////////////////////////////

        public CompanyViewModel getAllDealLogItemsViewModels()
        {
            var companyLogItems = _repo.Query<CompanyLogItem>().ToList();

            var companies = _repo.Query<Company>().ToList();

            var deals = _repo.Query<Deal>().ToList();

            var contacts = _repo.Query<Contact>().ToList();

            var companyViewModel = new CompanyViewModel
            {
                CompanyLogItemsList = companyLogItems
            };

            return companyViewModel;

        }

        public CompanyViewModel getCompanyLogItemViewModel(int id)
        {
            var companyLogItems = _repo.Query<CompanyLogItem>().Where(c => c.Id == id).FirstOrDefault();

            var deals = _repo.Query<Deal>().ToList();

            var companies = _repo.Query<Company>().ToList();

            var contacts = _repo.Query<Contact>().ToList();

            var companyViewModel = new CompanyViewModel
            {
                CompanyLogItem = companyLogItems
            };

            return companyViewModel;
        }

        public CompanyViewModel getCompanyLogItemViewModelByCompanyId(int id)
        {
            var companyLogItems = _repo.Query<CompanyLogItem>().ToList();

            var deals = _repo.Query<Deal>().ToList();

            var companies = _repo.Query<Company>().ToList();

            var contacts = _repo.Query<Contact>().ToList();

            var companyViewModel = new CompanyViewModel
            {
                CompanyLogItemsList = companyLogItems
            };

            return companyViewModel;
        }

        ///////////////Company Items///////////////
        ////////////////////////////////////////
        public CompanyViewModel getAllCompanyViewModels()
        {
            var deals = _repo.Query<Deal>().ToList();

            var companies = _repo.Query<Company>().ToList();

            var contacts = _repo.Query<Contact>().ToList();

            var companyViewModel = new CompanyViewModel
            {
                CompanyList = companies
            };

            return companyViewModel;
        }

        public CompanyViewModel getCompanyViewModel(int id)
        {
            var companies = _repo.Query<Company>().Where(c => c.Id == id).FirstOrDefault();

            var deals = _repo.Query<Deal>().Where(d => d.CompanyId == id).ToList();

            var contacts = _repo.Query<Contact>().Where(c => c.CompanyId == id).ToList();

            //var usertasks = _repo.Query<UserTask>().Where(u => u.DealId.)

            var companyViewModel = new CompanyViewModel
            {
                Company = companies
            };

            return companyViewModel;
        }
    }
}