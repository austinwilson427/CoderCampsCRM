using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoderCampsCRM.Models.ViewModels
{
    public class ContactFilterViewModel
    {
        public int CompanyId { get; set; }
        public int DealId { get; set; }
        public int TaskId { get; set; }
    }
}