using BLLs;
using Commons;
using Models.EmailJob;
using Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace WebBackend.Controllers
{
    [Authorize]
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        [Authorize]
        [Route("getusers")]
        [HttpPost]
        public IHttpActionResult GetUsers()
        {
            UserBLL bll = new UserBLL();
            var result = new ApiResult()
            {
                Status = Constant.API_RESULT_SUCCESS,
            };
            try
            {
                result.Data = bll.GetUsers();
            }
            catch (Exception ex)
            {
                result.Status = Constant.API_RESULT_ERROR;
                result.Messages = ex.Message;
            }
            return Ok(result);
        }

        [Authorize]
        [Route("getroles")]
        [HttpPost]
        public IHttpActionResult GetRoles()
        {
            UserBLL bll = new UserBLL();
            var result = new ApiResult()
            {
                Status = Constant.API_RESULT_SUCCESS,
            };
            try
            {
                result.Data = bll.GetRoles();
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
        [Route("changestatus")]
        public IHttpActionResult ChangeAuthorStatus(UserModel user)
        {
            var result = new ApiResult()
            {
                Status = Constant.API_RESULT_SUCCESS,
                Data = null
            };
            EmailBLL emailBLL = new EmailBLL();
            EmailModel email = new EmailModel();
            email.EmailTo = user.Email;

            if (user.StatusTypeID == 2)
            {
                email.Title = "Xét Duyệt Tài Khoản!";
                email.Body = "Tài khoản (" + user.UserName + ") đã vi phạm một điều luật nào đó nên đã không được phép tạo tài khoản. Xin đăng kí lại sau. <br /> Chân trọng thông báo!";
            }

            if (user.StatusTypeID == 3)
            {
                email.Title = "Xét Duyệt Tài Khoản!";
                email.Body = "Tài khoản (" + user.UserName + ") đã được chấp nhận. Xin vui lòng quay lại website để đăng nhập và sử dụng.<br /> Chân trọng thông báo!";
                
                user.StatusTypeID = 4;
            }

            if (user.StatusTypeID == 5)
            {
                email.Title = "Xử lý Tài Khoản!";
                email.Body = "Tài khoản (" + user.UserName + ") đã vi phạm một điều luật nào đó nên đã bị khóa tài khoản. Xin vui lòng liên lạc với BQL. <br /> Chân trọng thông báo!";
            }

            email.IsSent = false;
            email.EmailID = 0;            

            try
            {
                emailBLL.SaveEmail(email);
                UserBLL bll = new UserBLL();
                bll.ChangeStatus(user.UserID, user.StatusTypeID);
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