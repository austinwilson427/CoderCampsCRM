using CoderCampsCRM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoderCampsCRM.Repositories
{
    public class DealRepository : IDealRepository
    {
        private IGenericRepository _repo;

        public DealRepository(IGenericRepository repo)
        {
            this._repo = repo;
        }

        ///////////////DealLogItems///////////////
        //////////////////////////////////////////

        public DealViewModel getAllDealLogItemsViewModels()
        {
            var dealLogItems = _repo.Query<DealLogItem>().ToList();

            var deals = _repo.Query<Deal>().ToList();

            var companies = _repo.Query<Company>().ToList();

            var contacts = _repo.Query<Contact>().ToList();

            var dealViewModel = new DealViewModel
            {
                DealLogItemsList = dealLogItems
            };

            return dealViewModel;
            
        }

        public DealViewModel getDealLogItemViewModel(int id)
        {
            var dealLogItems = _repo.Query<DealLogItem>().Where(dl => dl.Id == id).FirstOrDefault();

            var deals = _repo.Query<Deal>().ToList();

            var companies = _repo.Query<Company>().ToList();

            var contacts = _repo.Query<Contact>().ToList();

            var dealViewModel = new DealViewModel
            {
                DealLogItem = dealLogItems
            };

            return dealViewModel;
        }

        ///////////////Deal Items///////////////
        ////////////////////////////////////////
        public DealViewModel getAllDealViewModels()
        {
            var deals = _repo.Query<Deal>().ToList();

            var companies = _repo.Query<Company>().ToList();

            var contacts = _repo.Query<Contact>().ToList();

            var dealViewModel = new DealViewModel
            {
                DealList = deals
            };

            return dealViewModel;
        }

        public DealViewModel getDealViewModel(int id)
        {
            var deals = _repo.Query<Deal>().Where(d => d.Id == id).FirstOrDefault();

            var companies = _repo.Query<Company>().ToList();

            var contacts = _repo.Query<Contact>().ToList();

            var dealViewModel = new DealViewModel
            {
                Deal = deals
            };

            return dealViewModel;
        }


    }
}