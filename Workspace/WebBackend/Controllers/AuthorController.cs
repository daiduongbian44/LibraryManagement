using Commons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebBackend.Controllers
{
    [Authorize]
    [RoutePrefix("api/author")]
    public class AuthorController : ApiController
    {
        [Authorize]
        [Route("getauthors")]
        [HttpPost]
        public IHttpActionResult GetAuthors()
        {
            var listAuthor = new List<string>();
            listAuthor.Add("Manh");
            listAuthor.Add("Tuan");

            var result = new ApiResult()
            {
                Status = Constant.API_RESULT_SUCCESS,
                Data = listAuthor
            };
            return Ok(result);
        }


    }
}
