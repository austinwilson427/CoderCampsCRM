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
    public class TasksController : ApiController
    {
            private IGenericRepository _repo; 

            //}
            public TasksController(IGenericRepository repo)
            {
                _repo = repo;
            }




            public IHttpActionResult GetAllItems()
            {
                var data = _repo.Query<UserTask>();

                return Ok(data);
            }

            [Route("api/tasks/{id}")]
            public IHttpActionResult GetIndItem(int id)
            {
                var data = _repo.Find<UserTask>(id);

                return Ok(data);
            }

            public IHttpActionResult PostScore(UserTask taskToAdd)
            {
                if (ModelState.IsValid)
                {

                    //Creating a new task
                    if (taskToAdd.Id == 0)
                    {
                        _repo.Add<UserTask>(taskToAdd);
                        _repo.SaveChanges();
                        return Ok();

                    }
                    else
                    {
                        //Updating if task already exists
                        var originalTask = _repo.Find<UserTask>(taskToAdd.Id);

                        originalTask.Status = taskToAdd.Status;
                        originalTask.TaskType = taskToAdd.TaskType;
                        originalTask.TaskDueDate = taskToAdd.TaskDueDate;
                        originalTask.TaskDescription = taskToAdd.TaskDescription;


                        _repo.SaveChanges();
                        return Ok(taskToAdd);
                    }
                }

                return BadRequest();


            }

            public IHttpActionResult DeleteScore(int id)

            {
                _repo.Delete<UserTask>(id);
                _repo.SaveChanges();
                return Ok();
            }
        }
    }

