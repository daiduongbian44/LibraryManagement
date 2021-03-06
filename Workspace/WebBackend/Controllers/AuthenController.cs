﻿using System;
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
using System.Web;
using System.Security.Claims;

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
            var identity = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identity.Claims;
            string currentUserRoleID = string.Empty;
            if (claims != null && claims.Count() > 0)
            {
                currentUserRoleID = claims.ElementAt(2).Value;
            }
            var result = new ApiResult()
            {
                Status = Constant.API_RESULT_SUCCESS,
                Data = null
            };
            try
            {
                // Hash password before save to db
                if (user.UserID == 0)
                {
                    PasswordHasher hasher = new PasswordHasher();
                    user.PassWord = hasher.HashPassword(user.PassWord);
                }

                UserBLL bll = new UserBLL();
                EmailBLL emailBLL = new EmailBLL();
                int value = bll.SaveUser(user);

                if (value <= 0)
                {
                    result.Status = Constant.API_RESULT_ERROR;
                    result.Messages = "Thông tin về người dùng: username/email/phone là duy nhất. Hãy kiểm tra lại.";
                }
                else
                {
                    if (string.IsNullOrEmpty(currentUserRoleID))
                    {
                        EmailModel email = new EmailModel();
                        string RoleName = "";
                        switch (user.RoleID)
                        {
                            case 1:
                                RoleName = "quản trị hệ thống";
                                break;
                            case 2:
                                RoleName = "cán bộ quản lý";
                                break;
                            case 3:
                                RoleName = "người đọc";
                                break;
                        }
                        email.EmailTo = ConfigurationManager.AppSettings["EmailAdmin"];
                        email.Title = "Kích hoạt tài khoản mới!";
                        email.Body = "Tài khoản (" + user.UserName + ") vừa được tạo vào lúc " + DateTime.Now.ToString() + ", yêu cầu cấp quyền " + RoleName + ". Hãy truy cập vào trang web để xử lý <br /> Chân trọng thông báo!";
                        email.IsSent = false;
                        email.EmailID = 0;
                        emailBLL.SaveEmail(email);
                    }
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
