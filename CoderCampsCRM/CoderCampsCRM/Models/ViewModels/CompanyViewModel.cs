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
    }
}