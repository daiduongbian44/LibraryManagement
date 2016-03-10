using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLLs;
using Commons;
using Models.User;
using WebBackend.Models;
using Microsoft.AspNet.Identity;
using Models.EmailJob;
using System.Configuration;

namespace WebBackend.Controllers
{
    [RoutePrefix("api/authen")]
    public class AuthenController : ApiController
    {
        [AllowAnonymous]
        public IHttpActionResult CheckUserExist(UserExisted user)
        {
            var result = new ApiResult()
            {
                Status = Constant.API_RESULT_SUCCESS,
                Data = null
            };
            try
            {

            }
            catch (Exception ex)
            {
                result.Status = Constant.API_RESULT_ERROR;
                result.Messages = ex.Message;
            }
            return Ok(result);
        }

        [AllowAnonymous]
        [Route("saveuser")]
        [HttpPost]
        public IHttpActionResult SaveUser(UserModel user)
        {
            var result = new ApiResult()
            {
                Status = Constant.API_RESULT_SUCCESS,
                Data = null
            };
            try
            {
                // Hash password before save to db
                PasswordHasher hasher = new PasswordHasher();
                user.PassWord = hasher.HashPassword(user.PassWord);

                UserBLL bll = new UserBLL();
                EmailBLL emailBLL = new EmailBLL();
                int value = bll.SaveUser(user);

                EmailModel email = new EmailModel();
                email.EmailTo = ConfigurationManager.AppSettings["EmailAdmin"];
                email.Title = "Kích hoạt tài khoản mới!";
                email.Body = "Tài khoản (" + user.UserName + ") vừa được tạo vào lúc " + DateTime.Now.ToString() + ", yêu cầu cấp quyền quản lý. Hãy truy cập vào trang web để xử lý <br /> Chân trọng thông báo!";
                email.IsSent = false;
                email.EmailID = 0;
                emailBLL.SaveEmail(email);

                if (value <= 0)
                {
                    result.Status = Constant.API_RESULT_ERROR;
                    result.Messages = "Người dùng đã tồn tại.";
                }
            }
            catch (Exception ex)
            {
                result.Status = Constant.API_RESULT_ERROR;
                result.Messages = "Xảy ra lỗi khi thêm người dùng";
            }

            return Ok(result);
        }
    }
}
