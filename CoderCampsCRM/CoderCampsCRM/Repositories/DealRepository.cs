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

        ///////////////Deal-Contacts//////////////
        //////////////////////////////////////////

        public DealViewModel getAllDealContacts(int id)
        {
            var dealContacts = _repo.Query<DealContact>().Where(c => c.ContactId == id && c.isDealSharer == false).ToList();

            var deals = _repo.Query<Deal>().ToList();

            var contacts = _repo.Query<Contact>().ToList();

            var dealViewModel = new DealViewModel
            {
                DealContactsList = dealContacts
            };

            return dealViewModel;

        }

        public DealViewModel getAllDealsSharedByContactEmail(string email)
        {
            var dealContacts = _repo.Query<DealContact>().Where(c => c.ContactEmail == email && c.isDealSharer == true).ToList();

            var deals = _repo.Query<Deal>().ToList();

            var contacts = _repo.Query<Contact>().ToList();

            var dealViewModel = new DealViewModel
            {
                DealContactsList = dealContacts
            };

            return dealViewModel;

        }

        public DealViewModel getAllDealSharersByDealId(int id)
        {
            var dealContacts = _repo.Query<DealContact>().Where(c => c.DealId == id && c.isDealSharer == true).ToList();

            var deals = _repo.Query<Deal>().ToList();

            var contacts = _repo.Query<Contact>().ToList();

            var dealViewModel = new DealViewModel
            {
                DealContactsList = dealContacts
            };

            return dealViewModel;
        }

        public DealViewModel getAllDealContactsByDealId(int id)
        {
            var dealContacts = _repo.Query<DealContact>().Where(dc => dc.DealId == id && dc.isDealSharer == false).ToList();

            var deals = _repo.Query<Deal>().ToList();

            var contacts = _repo.Query<Contact>().ToList();

            var dealViewModel = new DealViewModel
            {
                DealContactsList = dealContacts
            };

            return dealViewModel;
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

        public DealViewModel getDealLogItemViewModelByDealId(int id)
        {
            var dealLogItems = _repo.Query<DealLogItem>().Where(dli => dli.DealId == id).ToList();

            var deals = _repo.Query<Deal>().ToList();

            var companies = _repo.Query<Company>().ToList();

            var contacts = _repo.Query<Contact>().ToList();

            var dealViewModel = new DealViewModel
            {
                DealLogItemsList = dealLogItems
            };

            return dealViewModel;
        }

        ///////////////Deal Items///////////////
        ////////////////////////////////////////

        public DealViewModel getAllDealViewModels(string id)
        {
            var deals = _repo.Query<Deal>().Where(c => c.UserId == id).ToList();

            var companies = _repo.Query<Company>().ToList();

            var contacts = _repo.Query<Contact>().ToList();

            var dealViewModel = new DealViewModel
            {
                DealList = deals
            };

            return dealViewModel;

        }

        public DealViewModel getDealViewModelsPag(int takeCount, int skipCount, string order, string orderDirection)
        {

            List<Deal> deals;

            if (order == "amount")
            {
                if (orderDirection == "descending")
                {
                    deals = _repo.Query<Deal>().OrderByDescending(d => d.Amount).Select(d => d).Skip(skipCount * takeCount).Take(takeCount).ToList();
                }
                else
                {
                    deals = _repo.Query<Deal>().OrderBy(d => d.Amount).Select(d => d).Skip(skipCount * takeCount).Take(takeCount).ToList();
                }

            }
            else if (order == "name")
            {
                if (orderDirection == "descending")
                {
                    deals = _repo.Query<Deal>().OrderByDescending(d => d.DealName).Select(d => d).Skip(skipCount * takeCount).Take(takeCount).ToList();
                }
                else
                {
                    deals = _repo.Query<Deal>().OrderBy(d => d.DealName).Select(d => d).Skip(skipCount * takeCount).Take(takeCount).ToList();
                }

            }
            else if (order == "stage")
            {
                if (orderDirection == "descending")
                {
                    deals = _repo.Query<Deal>().OrderByDescending(d => d.Stage).Select(d => d).Skip(skipCount * takeCount).Take(takeCount).ToList();
                }
                else
                {
                    deals = _repo.Query<Deal>().OrderBy(d => d.Stage).Select(d => d).Skip(skipCount * takeCount).Take(takeCount).ToList();
                }

            }
            else if (order == "closeDate")
            {
                if (orderDirection == "descending")
                {
                    deals = _repo.Query<Deal>().OrderByDescending(d => d.CloseDate).Select(d => d).Skip(skipCount * takeCount).Take(takeCount).ToList();
                }
                else
                {
                    deals = _repo.Query<Deal>().OrderBy(d => d.CloseDate).Select(d => d).Skip(skipCount * takeCount).Take(takeCount).ToList();
                }

            }
            else if (order == "contact")
            {
                if (orderDirection == "descending")
                {
                    deals = _repo.Query<Deal>().OrderByDescending(d => d.Contact.Name).Select(d => d).Skip(skipCount * takeCount).Take(takeCount).ToList();
                }
                else
                {
                    deals = _repo.Query<Deal>().OrderBy(d => d.Contact.Name).Select(d => d).Skip(skipCount * takeCount).Take(takeCount).ToList();
                }

            }
            else if (order == "company")
            {
                if (orderDirection == "descending")
                {
                    deals = _repo.Query<Deal>().OrderByDescending(d => d.Company.CompanyName).Select(d => d).Skip(skipCount * takeCount).Take(takeCount).ToList();
                }
                else
                {
                    deals = _repo.Query<Deal>().OrderBy(d => d.Company.CompanyName).Select(d => d).Skip(skipCount * takeCount).Take(takeCount).ToList();
                }

            }
            else
            {
                if (orderDirection == "descending")
                {
                    deals = _repo.Query<Deal>().OrderByDescending(d => d.Id).Select(d => d).Skip(skipCount * takeCount).Take(takeCount).ToList();
                }
                else
                {
                    deals = _repo.Query<Deal>().OrderBy(d => d.Id).Select(d => d).Skip(skipCount * takeCount).Take(takeCount).ToList();
                }

            }

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