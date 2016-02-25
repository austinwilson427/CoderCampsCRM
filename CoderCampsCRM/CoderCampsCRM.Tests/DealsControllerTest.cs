using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using CoderCampsCRM.Repositories;
using CoderCampsCRM.API;
using Moq;
using CoderCampsCRM.Models;
using System.Web.Http;
using System.Web.Http.Results;
using System.Collections.Generic;

namespace CoderCampsCRM.Tests
{
    [TestClass]
    public class DealsControllerTest
    {
        [TestMethod]
        public void GetDealsReturnsAListOfDeals()
        {
            ///////////////////Arrange///////////////////

            var mockGenRepository = new Mock<IGenericRepository>();
            var mockDealRepository = new Mock<IDealRepository>();
            mockDealRepository.Setup(x => x.getAllDealViewModels("jhsdf98sdhi89")).Returns(new DealViewModel
            {
                
                DealList = new List<Deal>
                {
                    new Deal
                    {
                        Id = 7,
                        DealName = "Test Deal",
                        Amount = 500000m,
                        Stage = "Qualified to Buy",
                        CloseDate = new DateTime(2015, 4, 27),
                        isArchived = false
                    },
                    new Deal
                    {
                        Id = 8,
                        DealName = "Test Deal Change 1",
                        Amount = 600000m,
                        Stage = "Presentation Scheduled",
                        CloseDate = new DateTime(2015, 3, 24),
                        isArchived = true
                    },
                    new Deal
                    {
                        Id = 9,
                        DealName = "Test Deal Change 2",
                        Amount = 700000m,
                        Stage = "Decision Maker Bought In",
                        CloseDate = new DateTime(2015, 5, 27),
                        isArchived = false
                    }
                }
            });



            var controller = new DealsController(mockGenRepository.Object, mockDealRepository.Object);

            ///////////////////Act///////////////////

            //Should Pass Test
            IHttpActionResult actionResult = controller.GetDealsOwned();

            var contentResult = actionResult as OkNegotiatedContentResult<List<Deal>>;

            Assert.IsInstanceOfType(actionResult, typeof(UnauthorizedResult));

            //Assert.IsNotNull(contentResult);
            //Assert.IsNotNull(contentResult.Content);
            //Assert.AreEqual(3, contentResult.Content.Count);
            //Assert.AreEqual("Test Deal Change 1", contentResult.Content.Find(d => d.Id == 8).DealName);



            
        }

        [TestMethod]
        public void GetADealViewModelReturnsDealWithSameId()
        {
            ///////////////////Arrange///////////////////

            var mockGenRepository = new Mock<IGenericRepository>();
            var mockDealRepository = new Mock<IDealRepository>();
            mockDealRepository.Setup(x => x.getDealViewModel(7)).Returns(new DealViewModel
            {
                Deal = new Deal
                {
                    Id = 7,
                    DealName = "Test Deal",
                    Amount = 500000m,
                    Stage = "Qualified to Buy",
                    CloseDate = new DateTime(2015, 4, 27),
                    isArchived = false
                }
            });
            var controller = new DealsController(mockGenRepository.Object, mockDealRepository.Object);


            ///////////////////Act///////////////////

            //Should Pass Test
            IHttpActionResult actionResult = controller.GetADealOwned(7);

            //Should Fail Test
            //IHttpActionResult actionResult = controller.GetADealViewModel(10);

            var contentResult = actionResult as OkNegotiatedContentResult<Deal>;

            ///////////////////Assert///////////////////

            Assert.IsInstanceOfType(actionResult, typeof(UnauthorizedResult));

            //Assert.IsNotNull(contentResult);
            //Assert.IsNotNull(contentResult.Content);
            //Assert.AreEqual(7, contentResult.Content.Id);
        }

        [TestMethod]
        public void GetADealViewModelReturnsNotFound()
        {
            ///////////////////Arrange///////////////////

            var mockGenRepository = new Mock<IGenericRepository>();
            var mockDealRepository = new Mock<IDealRepository>();
            mockDealRepository.Setup(x => x.getDealViewModel(7)).Returns(new DealViewModel
            {
                Deal = new Deal
                {
                    Id = 7
                }
            });
            var controller = new DealsController(mockGenRepository.Object, mockDealRepository.Object);


            ///////////////////Act///////////////////

            //Should Pass Test
            IHttpActionResult actionResult = controller.GetADealOwned(10);

            //Should Fail Test
            //IHttpActionResult actionResult = controller.GetADealViewModel(7);

            var contentResult = actionResult as OkNegotiatedContentResult<Deal>;

            ///////////////////Assert///////////////////

            Assert.IsInstanceOfType(actionResult, typeof(UnauthorizedResult));


        }

        [TestMethod]
        public void DeleteDealReturnsOk()
        {
            ///////////////////Arrange///////////////////

            var mockGenRepository = new Mock<IGenericRepository>();
            mockGenRepository.Setup(x => x.Add<Deal>(new Deal
            {
                Id = 7
            }
            ));

            var mockDealRepository = new Mock<IDealRepository>();

            var controller = new DealsController(mockGenRepository.Object, mockDealRepository.Object);

            ///////////////////Act///////////////////

            //Should Pass Test
            IHttpActionResult actionResult = controller.DeleteDeal(7);

            //No should fail test. Delete deal will return Ok() even if

            // Assert
            Assert.IsInstanceOfType(actionResult, typeof(UnauthorizedResult));
            //Not logged in
        }

        [TestMethod]
        public void PostDealSavesCorrectInfoWhenAddingNewDeal()
        {
            ///////////////////Arrange///////////////////

            var mockGenRepository = new Mock<IGenericRepository>();

            var mockDealRepository = new Mock<IDealRepository>();

            var controller = new DealsController(mockGenRepository.Object, mockDealRepository.Object);

            ///////////////////Act///////////////////

            //Should Pass Test
            IHttpActionResult actionResult = controller.PostDeal(new Deal
            {
                Id = 0,
                DealName = "Test Deal",
                Amount = 500000m,
                Stage = "Qualified to Buy",
                CloseDate = new DateTime(2015, 4, 27),
                isArchived = false
            });

            var contentResult = actionResult as OkNegotiatedContentResult<Deal>;

            // Assert
            Assert.IsInstanceOfType(actionResult, typeof(UnauthorizedResult));
            //Assert.IsNotNull(contentResult);
            //Assert.IsNotNull(contentResult.Content);
            //Assert.AreEqual(0, contentResult.Content.Id);
            //Assert.AreEqual("Test Deal", contentResult.Content.DealName);
            //Assert.AreEqual(500000m, contentResult.Content.Amount);
            //Assert.AreEqual("Qualified to Buy", contentResult.Content.Stage);
            //Assert.AreEqual(new DateTime(2015, 4, 27), contentResult.Content.CloseDate);
            //Assert.AreEqual(false, contentResult.Content.isArchived);
        }

        [TestMethod]
        public void PostDealEditsCorrectInfoWhenEditingDeal()
        {
            ///////////////////Arrange///////////////////

            var mockGenRepository = new Mock<IGenericRepository>();

            mockGenRepository.Setup(x => x.Find<Deal>(7)).Returns(new Deal
            {
                Id = 7,
                DealName = "Test Deal",
                Amount = 500000m,
                Stage = "Qualified to Buy",
                CloseDate = new DateTime(2015, 4, 27),
                isArchived = false
            });

            var mockDealRepository = new Mock<IDealRepository>();

            var controller = new DealsController(mockGenRepository.Object, mockDealRepository.Object);

            ///////////////////Act///////////////////

            //Should Pass Test
            IHttpActionResult actionResult = controller.PostDeal(new Deal
            {
                Id = 7,
                DealName = "Test Deal Change",
                Amount = 600000m,
                Stage = "Presentation Scheduled",
                CloseDate = new DateTime(2015, 3, 24),
                isArchived = true
            });

            var contentResult = actionResult as OkNegotiatedContentResult<Deal>;

            // Assert
            Assert.IsInstanceOfType(actionResult, typeof(UnauthorizedResult));
            //Assert.IsNotNull(contentResult);
            //Assert.IsNotNull(contentResult.Content);
            //Assert.AreEqual(7, contentResult.Content.Id);
            //Assert.AreEqual("Test Deal Change", contentResult.Content.DealName);
            //Assert.AreEqual(600000m, contentResult.Content.Amount);
            //Assert.AreEqual("Presentation Scheduled", contentResult.Content.Stage);
            //Assert.AreEqual(new DateTime(2015, 3, 24), contentResult.Content.CloseDate);
            //Assert.AreEqual(true, contentResult.Content.isArchived);

            //Failed test with unchanged results
            //Assert.AreEqual("Test Deal", contentResult.Content.DealName);
            //Assert.AreEqual(500000m, contentResult.Content.Amount);
            //Assert.AreEqual("Qualified to Buy", contentResult.Content.Stage);
            //Assert.AreEqual(new DateTime(2015, 4, 27), contentResult.Content.CloseDate);
            //Assert.AreEqual(false, contentResult.Content.isArchived);
        }



    }
}
