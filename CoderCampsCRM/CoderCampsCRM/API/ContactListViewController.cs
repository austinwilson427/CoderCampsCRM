﻿using CoderCampsCRM.Models.ViewModels;
using CoderCampsCRM.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CoderCampsCRM.API
{
    public class ContactListViewController : ApiController
    {
        private IContactListViewRepository _repo;

        public ContactListViewController(IContactListViewRepository repo)
        {
            _repo = repo;
        }

        public IHttpActionResult getContactListViewModel()
        {
            return Ok(_repo.getContactListViewModel());
        }
    }
}