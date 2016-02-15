using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CoderCampsCRM.Models
{
    public class DealViewModel : ApiController
    {
        public Deal Deal { get; set; }
        public List<Deal> DealList { get; set; }
        public DealLogItem DealLogItem { get; set; }
        public List<DealLogItem> DealLogItemsList { get; set; }
        public DealContact DealContacts { get; set; }
        public List<DealContact> DealContactsList { get; set; }
    }
}
