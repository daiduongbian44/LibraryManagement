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
                int value = bll.SaveAuthor(author);
                if (value <= 0)
                {
                    result.Status = Constant.API_RESULT_ERROR;
                    result.Messages = "Tác giả đã tồn tại.";
                }
            }
            catch (Exception ex)
            {
                result.Status = Constant.API_RESULT_ERROR;
                result.Messages = "Xảy ra lỗi hệ thống khi lưu tác giả.";
            }

            return Ok(result);
        }

        [HttpPost]
        [Authorize]
        [Route("changeauthorstatus")]
        public IHttpActionResult ChangeAuthorStatus(AuthorModel author)
        {
            var result = new ApiResult()
            {
                Status = Constant.API_RESULT_SUCCESS,
                Data = null
            };
            try
            {
                AuthorBLL bll = new AuthorBLL();

                bool value = bll.ChangeAuthorStatus(author.AuthorID, author.StatusTypeID);
                if (!value)
                {
                    result.Status = Constant.API_RESULT_ERROR;
                    result.Messages = "Xảy ra lỗi trong quá trình xử lý.";
                }
            }
            catch (Exception ex)
            {
                result.Status = Constant.API_RESULT_ERROR;
                result.Messages = "Xảy ra lỗi hệ thống khi xử lý.";
            }

            return Ok(result);
        }

    }
}
