using CoderCampsCRM.Models;
using CoderCampsCRM.Repositories;
using Microsoft.AspNet.Identity;
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

        public CompaniesController() : this(new GenericRepository())
        {
        }

        public CompaniesController(IGenericRepository repo)
        {
            _repo = repo;
        }
        public IHttpActionResult Get()
        {
            string userId = User.Identity.GetUserId();
            //var user = _repo.Query<ApplicationUser>().Where(u => u.Id == userId).Include(u => u.Company).FirstOrDefault();
            //var company = _repo.Find<Company>();
            //if (user.Company = userId)

            var companies = from c in _repo.Query<Company>()
                            select c;

            //var compList = from c in _repo.Query<Company>()
            //               where c.ApplicationUser_Id == userId
            //               select c;

            //return Ok(compList.ToList());
            return Ok(companies.ToList());
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
                //var userId = User.Identity.GetUserId();
                //var user = _repo.Query<ApplicationUser>().Where(u => u.Id == userId).Include(u => u.Companies).FirstOrDefault();

                //company.CompanyCreateDate = DateTime.Now;
                //_repo.Add<Company>(company);
                //_repo.SaveChanges();
                //user.Companies.Add(company);
                //company.ApplicationUser_Id = userId;
                //_repo.SaveChanges();
                //return Ok(company);
                return Ok();
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

                original.CompanyNextActivityDate = company.CompanyNextActivityDate;
                company.CompanyLastActivityeDate = DateTime.Now;
                original.CompanyLastActivityeDate = company.CompanyLastActivityeDate;

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
