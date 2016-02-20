using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoderCampsCRM.Models
{
    public class ExternalLoginData
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
    }
}