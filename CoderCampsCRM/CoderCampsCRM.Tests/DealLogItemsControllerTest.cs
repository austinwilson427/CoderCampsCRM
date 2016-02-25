using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using CoderCampsCRM.Repositories;
using CoderCampsCRM.Models;
using CoderCampsCRM.API;
using System.Web.Http;
using System.Web.Http.Results;

namespace CoderCampsCRM.Tests
{
    [TestClass]
    public class DealLogItemsControllerTest
    {

        [TestMethod]
        public void GetDealLogItemsReturnsAListOfDealLogs()
        {
            ///////////////////Arrange///////////////////

            var mockGenRepository = new Mock<IGenericRepository>();
            var mockDealRepository = new Mock<IDealRepository>();
            mockDealRepository.Setup(x => x.getAllDealLogItemsViewModels()).Returns(new DealViewModel
            {
                DealLogItemsList = new List<DealLogItem>
                {
                    new DealLogItem
                    {
                        Id = 7,
                        Type = "Note",
                        StartTime = new DateTime(2015, 4, 27),
                        EndTime = new DateTime(2015, 4, 29),
                        Content = "A note has been left",
                        SubmittedBy = "Austin Wilson",
                        ContactId = 1,
                        DealId = 1
                    },
                    new DealLogItem
                    {
                        Id = 8,
                        Type = "Task",
                        StartTime = new DateTime(2015, 3, 24),
                        EndTime = new DateTime(2015, 3, 27),
                        Content = "A task has been left",
                        SubmittedBy = "Bob Smith",
                        ContactId = 2,
                        DealId = 2
                    },
                    new DealLogItem
                    {
                        Id = 9,
                        Type = "Activity",
                        StartTime = new DateTime(2015, 5, 27),
                        EndTime = new DateTime(2015, 5, 29),
                        Content = "An activity has been left",
                        SubmittedBy = "John Doe",
                        ContactId = 3,
                        DealId = 3
                    }
                }
            });

            var controller = new DealLogItemsController(mockGenRepository.Object, mockDealRepository.Object);

            ///////////////////Act///////////////////

            //Should Pass Test
            IHttpActionResult actionResult = controller.GetDealLogItems();

            var contentResult = actionResult as OkNegotiatedContentResult<List<DealLogItem>>;

            Assert.IsNotNull(contentResult);
            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual(3, contentResult.Content.Count);
            Assert.AreEqual("A task has been left", contentResult.Content.Find(d => d.Id == 8).Content);

            //Should Not Pass
            //Assert.AreEqual(4, contentResult.Content.Count);
            //Assert.AreEqual("A note has been left", contentResult.Content.Find(d => d.Id == 8).Content);
        }

        [TestMethod]
        public void GetADealLogItemReturnsItemWithSameId()
        {
            ///////////////////Arrange///////////////////

            var mockGenRepository = new Mock<IGenericRepository>();
            var mockDealRepository = new Mock<IDealRepository>();
            mockDealRepository.Setup(x => x.getDealLogItemViewModel(9)).Returns(new DealViewModel
            {
                DealLogItem = new DealLogItem
                {
                    Id = 9,
                    Type = "Task",
                    StartTime = new DateTime(2015, 3, 24),
                    EndTime = new DateTime(2015, 3, 27),
                    Content = "A task has been left",
                    SubmittedBy = "Bob Smith",
                    ContactId = 2,
                    DealId = 2
                }
            });

            var controller = new DealLogItemsController(mockGenRepository.Object, mockDealRepository.Object);


            ///////////////////Act///////////////////

            //Should Pass Test
            IHttpActionResult actionResult = controller.GetADealLogItem(9);

            //Should Fail Test
            //IHttpActionResult actionResult = controller.GetADealLogItem(10);

            var contentResult = actionResult as OkNegotiatedContentResult<DealLogItem>;

            ///////////////////Assert///////////////////

            Assert.IsInstanceOfType(actionResult, typeof(UnauthorizedResult));
            //Assert.IsNotNull(contentResult);
            //Assert.IsNotNull(contentResult.Content);
            //Assert.AreEqual(9, contentResult.Content.Id);
            //Assert.AreEqual("A task has been left", contentResult.Content.Content);
        }

        [TestMethod]
        public void GetADealLogItemByDealIdReturnsAListOfItemsWithSameDealId()
        {
            ///////////////////Arrange///////////////////

            var mockGenRepository = new Mock<IGenericRepository>();
            var mockDealRepository = new Mock<IDealRepository>();
            mockDealRepository.Setup(x => x.getDealLogItemViewModelByDealId(2)).Returns(new DealViewModel
            {
                DealLogItemsList = new List<DealLogItem>
                {
                    new DealLogItem
                    {
                        Id = 8,
                        Type = "Task",
                        StartTime = new DateTime(2015, 3, 24),
                        EndTime = new DateTime(2015, 3, 27),
                        Content = "A task has been left",
                        SubmittedBy = "Bob Smith",
                        ContactId = 2,
                        DealId = 2
                    },
                    new DealLogItem
                    {
                        Id = 9,
                        Type = "Activity",
                        StartTime = new DateTime(2015, 5, 27),
                        EndTime = new DateTime(2015, 5, 29),
                        Content = "An activity has been left",
                        SubmittedBy = "John Doe",
                        ContactId = 3,
                        DealId = 2
                    }
                }
            });

            var controller = new DealLogItemsController(mockGenRepository.Object, mockDealRepository.Object);


            ///////////////////Act///////////////////

            //Should Pass Test
            IHttpActionResult actionResult = controller.GetDealLogItemsByDealId(2);

            var contentResult = actionResult as OkNegotiatedContentResult<List<DealLogItem>>;

            Assert.IsInstanceOfType(actionResult, typeof(UnauthorizedResult));
            //Assert.IsNotNull(contentResult);
            //Assert.IsNotNull(contentResult.Content);
            //Assert.AreEqual(2, contentResult.Content.Count);
            //Assert.AreEqual("A task has been left", contentResult.Content.Find(d => d.Id == 8).Content);
        }

        [TestMethod]
        public void GetADealLogItemReturnsNotFound()
        {
            ///////////////////Arrange///////////////////

            var mockGenRepository = new Mock<IGenericRepository>();
            var mockDealRepository = new Mock<IDealRepository>();
            mockDealRepository.Setup(x => x.getDealLogItemViewModel(9)).Returns(new DealViewModel
            {
                DealLogItem = new DealLogItem
                {
                    Id = 9,
                    Type = "Task",
                    StartTime = new DateTime(2015, 3, 24),
                    EndTime = new DateTime(2015, 3, 27),
                    Content = "A task has been left",
                    SubmittedBy = "Bob Smith",
                    ContactId = 2,

                    DealId = 2
                }
            });

            var controller = new DealLogItemsController(mockGenRepository.Object, mockDealRepository.Object);


            ///////////////////Act///////////////////

            //Should Pass Test
            IHttpActionResult actionResult = controller.GetADealLogItem(10);

            //Should Fail Test
            //IHttpActionResult actionResult = controller.GetADealLogItem(9);

            var contentResult = actionResult as OkNegotiatedContentResult<DealLogItem>;

            ///////////////////Assert///////////////////
            Assert.IsInstanceOfType(actionResult, typeof(UnauthorizedResult));

        }

        [TestMethod]
        public void DeleteDealLogItemReturnsOk()
        {
            ///////////////////Arrange///////////////////

            var mockGenRepository = new Mock<IGenericRepository>();
            mockGenRepository.Setup(x => x.Add<DealLogItem>(new DealLogItem
            {
                Id = 7
            }
            ));

            var mockDealRepository = new Mock<IDealRepository>();

            var controller = new DealLogItemsController(mockGenRepository.Object, mockDealRepository.Object);

            ///////////////////Act///////////////////

            //Should Pass Test
            IHttpActionResult actionResult = controller.DeleteDealLogItem(7);

            //No should fail test. Delete deal will return Ok() even if

            // Assert
            Assert.IsInstanceOfType(actionResult, typeof(OkResult));
        }

        [TestMethod]
        public void PostDealLogItemSavesCorrectInfoWhenAddingNewItem()
        {
            ///////////////////Arrange///////////////////

            var mockGenRepository = new Mock<IGenericRepository>();

            var mockDealRepository = new Mock<IDealRepository>();

            var controller = new DealLogItemsController(mockGenRepository.Object, mockDealRepository.Object);

            ///////////////////Act///////////////////

            //Should Pass Test
            IHttpActionResult actionResult = controller.PostDealLogItem(new DealLogItem
            {
                Id = 0,
                Type = "Task",
                StartTime = new DateTime(2015, 3, 24),
                EndTime = new DateTime(2015, 3, 27),
                Content = "A task has been left",
                SubmittedBy = "Bob Smith",
                ContactId = 2,
                DealId = 2

            });

            var contentResult = actionResult as OkNegotiatedContentResult<DealLogItem>;

            // Assert
            Assert.IsInstanceOfType(actionResult, typeof(UnauthorizedResult));
            //Assert.IsNotNull(contentResult);
            //Assert.IsNotNull(contentResult.Content);
            //Assert.AreEqual(0, contentResult.Content.Id);
            //Assert.AreEqual("A task has been left", contentResult.Content.Content);
            //Assert.AreEqual("Task", contentResult.Content.Type);
            //Assert.AreEqual(new DateTime(2015, 3, 24), contentResult.Content.StartTime);
            //Assert.AreEqual(new DateTime(2015, 3, 27), contentResult.Content.EndTime);
            //Assert.AreEqual("Bob Smith", contentResult.Content.SubmittedBy);
            //Assert.AreEqual(2, contentResult.Content.ContactId);
            //Assert.AreEqual(2, contentResult.Content.DealId);
        }

        [TestMethod]
        public void PostDealLogItemEditsCorrectInfoWhenEditingItem()
        {
            ///////////////////Arrange///////////////////

            var mockGenRepository = new Mock<IGenericRepository>();

            mockGenRepository.Setup(x => x.Find<DealLogItem>(7)).Returns(new DealLogItem
            {
                Id = 7,
                Type = "Task",
                StartTime = new DateTime(2015, 3, 24),
                EndTime = new DateTime(2015, 3, 27),
                Content = "A task has been left",
                SubmittedBy = "Bob Smith",
                ContactId = 2,
                DealId = 2
            });

            var mockDealRepository = new Mock<IDealRepository>();

            var controller = new DealLogItemsController(mockGenRepository.Object, mockDealRepository.Object);

            ///////////////////Act///////////////////

            //Should Pass Test
            IHttpActionResult actionResult = controller.PostDealLogItem(new DealLogItem
            {
                Id = 7,
                Type = "Note",
                StartTime = new DateTime(2015, 4, 24),
                EndTime = new DateTime(2015, 4, 27),
                Content = "A note has been left",
                SubmittedBy = "Austin Wilson",
                ContactId = 1,
                DealId = 1
            });

            var contentResult = actionResult as OkNegotiatedContentResult<DealLogItem>;

            // Assert
            Assert.IsInstanceOfType(actionResult, typeof(UnauthorizedResult));
            //Assert.IsNotNull(contentResult);
            //Assert.IsNotNull(contentResult.Content);
            //Assert.AreEqual(7, contentResult.Content.Id);
            //Assert.AreEqual("Note", contentResult.Content.Type);
            //Assert.AreEqual(new DateTime(2015, 4, 24), contentResult.Content.StartTime);
            //Assert.AreEqual(new DateTime(2015, 4, 27), contentResult.Content.EndTime);
            //Assert.AreEqual("A note has been left", contentResult.Content.Content);
            //Assert.AreEqual("Austin Wilson", contentResult.Content.SubmittedBy);
            //Assert.AreEqual(1, contentResult.Content.ContactId);
            //Assert.AreEqual(1, contentResult.Content.DealId);

            //Failed test with unchanged results
            //Assert.AreEqual("Task", contentResult.Content.Type);
            //Assert.AreEqual(new DateTime(2015, 3, 24), contentResult.Content.StartTime);
            //Assert.AreEqual(new DateTime(2015, 3, 27), contentResult.Content.EndTime);
            //Assert.AreEqual("A task has been left", contentResult.Content.Content);
            //Assert.AreEqual("Bob Smith", contentResult.Content.SubmittedBy);
            //Assert.AreEqual(2, contentResult.Content.ContactId);
            //Assert.AreEqual(1, contentResult.Content.TaskId);
            //Assert.AreEqual(2, contentResult.Content.DealId);
        }








    }
}
