using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoderCampsCRM.Models.ViewModels
{
    public class CompanyViewModel
    {
        public Company Company { get; set; }
        public List<Company> CompanyList { get; set; }
        public CompanyLogItem CompanyLogItem { get; set; }
        public List<CompanyLogItem> CompanyLogItemsList { get; set; }
        public Contact Contact { get; set; }
        public List<Deal> Deals { get; set; }
        public List<Company> Companies { get; set; }
        public List<DealContact> CompanyContactsList { get; set; }
    }
}