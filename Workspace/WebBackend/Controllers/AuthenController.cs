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

namespace WebBackend.Controllers
{
    [RoutePrefix("api/authen")]
    public class AuthenController : ApiController
    {

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
                int value = bll.SaveUser(user);
                if(value <= 0)
                {
                    result.Status = Constant.API_RESULT_ERROR;
                    result.Messages = "Người dùng đã tồn tại.";
                }
            }
            catch (Exception ex)
            {
                result.Status = Constant.API_RESULT_ERROR;
                result.Messages = "Xảy ra lỗi khi lưu người dùng";
            }

            return Ok(result);
        }
    }
}
