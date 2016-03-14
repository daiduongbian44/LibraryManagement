using BLLs;
using Commons;
using Models.Book;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebBackend.Controllers
{
    [RoutePrefix("api/book")]
    public class BookController : ApiController
    {

        [Authorize]
        [Route("savebook")]
        [HttpPost]
        public IHttpActionResult SaveBook(BookModel book)
        {
            var result = new ApiResult()
            {
                Status = Constant.API_RESULT_SUCCESS,
                Data = null
            };
            try
            {
                BookBLL bll = new BookBLL();
                int value = bll.SaveBook(book);
                if (value <= 0)
                {
                    result.Status = Constant.API_RESULT_ERROR;
                    result.Messages = "Cuốn sách đã tồn tại.";
                }
            }
            catch (Exception ex)
            {

                result.Status = Constant.API_RESULT_ERROR;
                result.Messages = "Xảy ra lỗi khi lưu cuốn sách";
            }

            return Ok(result);
        }

        [Authorize]
        [Route("getbooks")]
        [HttpPost]
        public IHttpActionResult GetBooks()
        {
            var result = new ApiResult()
            {
                Status = Constant.API_RESULT_SUCCESS,
                Data = null
            };
            try
            {
                BookBLL bll = new BookBLL();
                result.Data = bll.GetAllBooks();
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
        [Route("changebookstatus")]
        public IHttpActionResult ChangeBookStatus(BookModel book, int statusTypeID)
        {
            var result = new ApiResult()
            {
                Status = Constant.API_RESULT_SUCCESS,
                Data = null
            };
            try
            {
                BookBLL bll = new BookBLL();

                bool value = bll.ChangeBookStatus(book.BookID, statusTypeID);
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
