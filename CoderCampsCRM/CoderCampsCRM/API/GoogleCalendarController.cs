using CoderCampsCRM.Models;
using CoderCampsCRM.Repositories;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
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
    public class GoogleCalendarController : ApiController
    {
        public IGenericRepository _repo;
        public GoogleCalendarController(IGenericRepository repo)
        {
            _repo = repo;
        }

        public IHttpActionResult Get()
        {
            string resultJson = string.Empty;

            var claimsInfo = User.Identity as ClaimsIdentity;
            string googleAccessToken = claimsInfo.Claims.First(cl => cl.Type == "GoogleAccessToken").Value;

            try
            {
                // request format and fields details : https://developers.google.com/google-apps/calendar/v3/reference/events/insert

                string addEventTokenEndPoint = string.Format(@"https://www.googleapis.com/calendar/v3/calendars/primary/events?minAccessRole=writer&access_token={0}&alt=json&maxAttendees={1}&sendNotifications={2}&supportsAttachments={3}", googleAccessToken, 5, "true", "false");

                int id = _repo.Query<UserTask>().Max(ut => ut.Id);
                var data = _repo.Find<UserTask>(id);

                JObject insertEventJson = new JObject();
               
                insertEventJson.Add("summary", data.Type);
                insertEventJson.Add("location", "Seattle,WA");
                insertEventJson.Add("description", data.Description);

                var startTime = new JObject();
                string startTimeVal = DateTime.Parse(data.StartDate).ToString("yyyy-MM-ddTHH:mm:sszzz") as string;
                startTime.Add("dateTime", startTimeVal);
                startTime.Add("timeZone", TimeZoneInfo.Local.DisplayName);
                insertEventJson.Add("start", startTime);

                var endTime = new JObject();
                string endTimeVal = DateTime.Parse(data.DueDate).ToString("yyyy-MM-ddTHH:mm:sszzz") as string;
                endTime.Add("dateTime", endTimeVal);
                endTime.Add("timeZone", TimeZoneInfo.Local.DisplayName);
                insertEventJson.Add("end", endTime);

                var recurrence = new JObject();
                recurrence.Add("RRULE", "FREQ=DAILY;COUNT=2");
                insertEventJson.Add("recurrence", new JArray(recurrence));

                var attendee1 = new JObject();
                attendee1.Add("email", "lpage@example.com");
                var attendee2 = new JObject();
                attendee2.Add("email", "sbrin@example.com");
                insertEventJson.Add("attendees", new JArray(attendee1, attendee2));

                var reminders = new JObject();
                reminders.Add("useDefault", false);
                var override1 = new JObject();
                override1.Add("method", "email");
                override1.Add("minutes", 24 * 60);
                var override2 = new JObject();
                override2.Add("method", "popup");
                override2.Add("minutes", 10);
                reminders.Add("overrides", new JArray(override1, override2));
                insertEventJson.Add("reminders", reminders);

                var xclient = new HttpClient();
                xclient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var xrequest = new HttpRequestMessage()
                {
                    RequestUri = new Uri(addEventTokenEndPoint),
                    Method = HttpMethod.Post,
                    Content = new StringContent(insertEventJson.ToString(Newtonsoft.Json.Formatting.Indented), Encoding.UTF8, "application/json"),
                };

                xrequest.Headers.Add("Origin", Request.RequestUri.GetLeftPart(UriPartial.Authority));
                xrequest.Headers.Accept.Clear();
                xrequest.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("*/*"));
                xrequest.Headers.Referrer = new Uri(Request.RequestUri.GetLeftPart(UriPartial.Authority));
                xrequest.Headers.Add("user-agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36");
                xrequest.Headers.Add("x-client-data", "CKO2yQEIxLbJAQj9lcoB");
                xrequest.Headers.Add("cache-control", "no-cache");
                xrequest.Headers.Add("accept-language", "en-US,en;q=0.8");
                xrequest.Headers.Add("accept-encoding", "gzip, deflate, sdch");

                var submitTask = xclient.SendAsync(xrequest)
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
                           resultJson = new StreamReader(response.Content.ReadAsStreamAsync().Result, Encoding.UTF8).ReadToEnd();
                       }
                   });
                submitTask.Wait();

                var submissionResult = Newtonsoft.Json.JsonConvert.DeserializeObject<JObject>(resultJson);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Ok(resultJson);
        }
    }
}
