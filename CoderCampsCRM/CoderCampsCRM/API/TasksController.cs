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
    public class TasksController : ApiController
    {
        private IGenericRepository _repo;

        //}
        public TasksController(IGenericRepository repo)
        {
            _repo = repo;
        }




        public IHttpActionResult GetAllTasks()
        {
            var userId = this.User.Identity.GetUserId();
            var data = _repo.Query<UserTask>().Where(u => u.UserId == userId).ToList();
            var contacts = _repo.Query<Contact>().ToList();
            return Ok(data);
        }

        [Route("api/tasks/{id}")]
        public IHttpActionResult GetIndTask(int id)
        {
            var userId = this.User.Identity.GetUserId();
            var data = _repo.Query<UserTask>().Where(u => u.UserId == userId && u.Id == id).FirstOrDefault();
            var contacts = _repo.Query<Contact>().ToList();
            return Ok(data);
        }

        public IHttpActionResult PostTask(UserTask taskToAdd)
        {
            var userId = this.User.Identity.GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }
            if (ModelState.IsValid)
            {

                //Creating a new task
                if (taskToAdd.Id == 0)
                {
                    taskToAdd.UserId = userId;
                    taskToAdd.CreatedOn = DateTime.Now;
                    _repo.Add<UserTask>(taskToAdd);
                    _repo.SaveChanges();
                    return Ok(taskToAdd);

                }
                else
                {
                    //Updating if task already exists
                    var originalTask = _repo.Find<UserTask>(taskToAdd.Id);

                    originalTask.Status = taskToAdd.Status;
                    originalTask.StartDate = taskToAdd.StartDate;
                    originalTask.Type = taskToAdd.Type;
                    originalTask.DueDate = taskToAdd.DueDate;
                    originalTask.ContactId = taskToAdd.ContactId;
                    originalTask.Description = taskToAdd.Description;


                    _repo.SaveChanges();
                    return Ok(taskToAdd);
                }
            }

            return BadRequest();


        }

        public IHttpActionResult DeleteTask(int id)

        {
            var userId = this.User.Identity.GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }
            _repo.Delete<UserTask>(id);
            _repo.SaveChanges();
            return Ok();
        }
    }
}

