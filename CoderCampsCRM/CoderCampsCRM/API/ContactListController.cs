using CoderCampsCRM.Models;
using CoderCampsCRM.Repositories;
using Microsoft.AspNet.Identity;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Web.Http;

namespace CoderCampsCRM.API
{
    [Authorize]
    public class ContactListController : ApiController
    {

        public IGenericRepository _repo;

        public ContactListController(IGenericRepository repo)
        {
            this._repo = repo;
        }

        //public IHttpActionResult getAllContacts()
        //{
        //    return Ok(_repo.Query<Contact>().ToList());
        //}

        public IHttpActionResult getOneContact(int id)
        {
            return Ok(_repo.Find<Contact>(id));
        }

        public IHttpActionResult addContact(Contact contact)
        {
            if (ModelState.IsValid)
            {
                if (contact.Id == 0)
                {
                    contact.CreatedOn = DateTime.Now;
                    var userId = this.User.Identity.GetUserId();
                    contact.UserId = userId;
                    _repo.Add(contact);
                    _repo.SaveChanges();
                    return Ok();
                }
                else
                {
                    var original = _repo.Find<Contact>(contact.Id);
                    original.Id = contact.Id;
                    original.UserId = contact.UserId;
                    original.Name = contact.Name;
                    original.JobTitle = contact.JobTitle;
                    original.PhoneNumber = contact.PhoneNumber;
                    original.CompanyId = contact.CompanyId;
                    original.UserId = contact.UserId;
                    original.City = contact.City;
                    original.Country = contact.Country;
                    original.LastInteraction = contact.LastInteraction;
                    original.State = contact.State;
                    original.StreetAddress = contact.StreetAddress;
                    original.Zip = contact.Zip;
                    original.Notes = contact.Notes;
                    original.Longitude = contact.Longitude;
                    original.Latitude = contact.Latitude;
                    original.ImageUrl = contact.ImageUrl;
                    _repo.SaveChanges();
                    return Ok();
                }
            }
            return BadRequest();
        }

        public IHttpActionResult deleteContact(int id)
        {
            _repo.Find<Contact>(id);
            _repo.Delete<Contact>(id);
            _repo.SaveChanges();
            return Ok();
        }

        /// <summary>
        /// Google contacts get part
        /// </summary>
        /// [Authorize]
        /// // public Models.Contact[] Get()
        public IEnumerable<Models.Contact> Get()
        {
            string resultJson = string.Empty;
            //resultJson is a string variable but i am not sure string.Empty. can we use "" instead of stirng.Empty?. 

            var claimsInfo = User.Identity as ClaimsIdentity;
            string googleAccessToken = claimsInfo.Claims.First(cl => cl.Type == "GoogleAccessToken").Value;
            string contactsTokenEndPoint = string.Format(@"https://www.google.com/m8/feeds/contacts/default/full?alt=json&access_token={0}&max-results=500&v=3.0", googleAccessToken);
            //contactsTokenEndPoint new variable. 
            // ExternalAccessToken is a property of ExternalLoginModels i am not sure but it seeds from that google link.
            //i dont understand string.format's function there.

            List<Models.Contact> gmailContacts = new List<Models.Contact>();
            //creating a list from GMailContactModel . But why?

            try
            {
                var client = new HttpClient();
                //client equals to HttpClient() and it uses for get and post data from url.
                var request = new HttpRequestMessage()
                //HttpRequestMessage takes uri from contactsTokenEndPoint and uses get method here.
                {
                    RequestUri = new Uri(contactsTokenEndPoint),
                    Method = HttpMethod.Get
                };

                request.Headers.Add("Origin", Request.RequestUri.GetLeftPart(UriPartial.Authority));
                request.Headers.Accept.Clear();
                request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("*/*"));
                request.Headers.Referrer = new Uri(Request.RequestUri.GetLeftPart(UriPartial.Authority));
                request.Headers.Add("user-agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36");
                request.Headers.Add("x-client-data", "CKO2yQEIxLbJAQj9lcoB");
                request.Headers.Add("cache-control", "no-cache");
                request.Headers.Add("accept-language", "en-US,en;q=0.8");
                request.Headers.Add("accept-encoding", "gzip, deflate, sdch");
                //these are HTTP headers but i dont know where they are came from and why we are use them

                var task = client.SendAsync(request)
                   .ContinueWith((taskwithmsg) =>
                   {
                       var response = taskwithmsg.Result;

                       if (response.Content.Headers.ContentEncoding.ToString().ToLower().Contains("gzip"))
                       {
                           var responseStream = new GZipStream(response.Content.ReadAsStreamAsync().Result, CompressionMode.Decompress);

                           StreamReader reader = new StreamReader(responseStream, Encoding.UTF8);

                           resultJson = reader.ReadToEnd();
                       }
                       else
                       {
                           throw new NotSupportedException("Other format is not supported");
                       }
                   });
                task.Wait();

                var entries = Newtonsoft.Json.JsonConvert.DeserializeObject<JObject>(resultJson)["feed"]["entry"] as JArray;

                foreach (var entry in entries)
                {
                    
                    if (entry["gd$email"] == null)
                    {
                        continue;
                    }

                    var emailNode = entry["gd$email"].FirstOrDefault(ml => ml["primary"] != null && ml["primary"].Value<string>() == "true");
                    if (emailNode == null && entry["gd$email"].Any())
                    {
                        emailNode = entry["gd$email"].First();
                    }

                    if (emailNode == null || string.IsNullOrEmpty(emailNode["address"].Value<string>()))
                    {
                        continue;
                    }

                    string email = emailNode["address"].Value<string>();

                    if (string.IsNullOrEmpty(email))
                    {
                        continue;
                    }

                    string name = entry["title"].HasValues ? entry["title"]["$t"].Value<string>() : "";
                    if (string.IsNullOrEmpty(name))
                    {
                        name = email;
                    }

                    string id = entry["id"].First.First.Value<string>();

                    string imageurl = entry["link"].HasValues ? entry["link"][0]["href"].Value<string>() : "";
                    if (!string.IsNullOrEmpty(imageurl))
                    {
                        imageurl += "&access_token=" + googleAccessToken;
                    }
                    var exContact = new Models.Contact()
                    {

                        GoogleId = id,
                        Email = email,
                        Name = name,
                        ImagerUrl = imageurl
                    };
                    if (!_repo.Query<Contact>().ToList().Any(cn => cn.Email == exContact.Email))
                    {
                        var userid = this.User.Identity.GetUserId();
                        exContact.UserId = userid;
                        _repo.Add(exContact);
                        
                        _repo.SaveChanges();
                    }

                    gmailContacts.Add(exContact);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }

            return gmailContacts;
            //return gmailContacts.ToArray();

        }

    }


}
