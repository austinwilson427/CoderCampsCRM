using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using CoderCampsCRM.Repositories;
using Moq;
using CoderCampsCRM.Models.ViewModels;
using CoderCampsCRM.Models;
using CoderCampsCRM.API;
using System.Web.Http;
using System.Web.Http.Results;

namespace CoderCampsCRM.Tests
{
    /// <summary>
    /// Summary description for ContactListControllerTest
    /// </summary>
    [TestClass]
    public class ContactListControllerTest
    {
        [TestMethod]
        public void GetContactsReturnsAListOfContacts()
        {
            var mockContactListViewRepository = new Mock<IContactListViewRepository>();
            var applicationUser = new Mock<ApplicationUser>();
            mockContactListViewRepository.Setup(c => c.GetContactListViewModel("7dhfad9sydao")).Returns(new ContactListViewModel
            {
                Contacts = new List<Contact>
            {
                        new Contact {
                    Id = 7,
                    Name = "Duran Gradwell" ,
                    Email = "duran.gradwell@gmail.com",
                    PhoneNumber = "789-235-3452",
                    JobTitle = "CEO",
                    Latitude = "33.490439",
                    Longitude = "75.178432",
                    UserId = "7dhfad9sydao"
                },
            }
            });

            var controller = new ContactListViewController(mockContactListViewRepository.Object);

            //Act//

            IHttpActionResult ActionResult = controller.GetContactListViewModel();
            var contentResult = ActionResult as OkNegotiatedContentResult<List<Contact>>;

            //Assert//

            //Assert.IsNotNull(contentResult);
            //Assert.AreEqual("Duran Gradwell", contentResult.Content.Find(c => c.UserId == "7dhfad9sydao").Name);
            Assert.IsInstanceOfType(contentResult, typeof(OkNegotiatedContentResult<List<Contact>>));
        }
    }
}
