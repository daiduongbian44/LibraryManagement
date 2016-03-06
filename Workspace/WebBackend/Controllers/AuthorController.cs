using BLLs;
using Commons;
using Models.Author;
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
            AuthorBLL bll = new AuthorBLL();
            var result = new ApiResult()
            {
                Status = Constant.API_RESULT_SUCCESS,
            };
            try
            {
                result.Data = bll.GetListAuthors();
            }
            catch (Exception ex)
            {
                result.Status = Constant.API_RESULT_ERROR;
                result.Messages = ex.Message;
            }
            return Ok(result);
        }

        [HttpPost]
        [Authorize]
        [Route("saveauthor")]
        public IHttpActionResult SaveAuthor(AuthorModel author)
        {
            var result = new ApiResult()
            {
                Status = Constant.API_RESULT_SUCCESS,
                Data = null
            };
            try
            {
                AuthorBLL bll = new AuthorBLL();
                bll.SaveAuthor(author);
            }
            catch (Exception ex)
            {
                result.Status = Constant.API_RESULT_ERROR;
                result.Messages = ex.Message;
            }

            return Ok(result);
        }

    }
}
