using CoderCampsCRM.Models;
using CoderCampsCRM.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CoderCampsCRM.API
{
    public class CompaniesController : ApiController
    {
        private IGenericRepository _repo;

        public CompaniesController():this(new GenericRepository())
        {
        }

        public CompaniesController(IGenericRepository repo)
        {
            _repo = repo;
        }
        public IHttpActionResult Get()
        {
            var variables = from v in _repo.Query<Company>()
                            select v;

            return Ok(variables.ToList());
        }
        public IHttpActionResult Get(int id)
        {
            var company = _repo.Find<Company>(id);
            return Ok(company);
        }


        public IHttpActionResult Post(Company company)
        {
            if (company.Id == 0)
            {
               
                _repo.Add<Company>(company);
                _repo.SaveChanges();
                return Ok(company);
            }
            else {
                var original = _repo.Find<Company>(company.Id);
                original.CompanyName = company.CompanyName;
                original.CompanyDomainName = company.CompanyDomainName;
                original.CompanyPhoneNumber = company.CompanyPhoneNumber;
                original.CompanyCountry = company.CompanyCountry;
                original.CompanyCity = company.CompanyCity;
                original.CompanyState = company.CompanyState;
                original.CompanyZip = company.CompanyZip;
                original.ComapanyAddress = company.ComapanyAddress;
                original.CompanyDescription = company.CompanyDescription;
                original.CompanyIndustry = company.CompanyIndustry;
                original.CompanyIsPublic = company.CompanyIsPublic;
                original.CompanyFacebook = company.CompanyFacebook;
                original.CompanyLinkedin = company.CompanyLinkedin;
                original.CompanyTwitter = company.CompanyTwitter;

                original.CompanyLastActivityeDate = company.CompanyLastActivityeDate;
                original.CompanyNextActivityDate = company.CompanyNextActivityDate;

                _repo.SaveChanges();
                return Ok(company);
            }
        }




        public IHttpActionResult Delete(int id)
        {
            _repo.Delete<Company>(id);
            _repo.SaveChanges();

            return Ok();
        }

    }
}
