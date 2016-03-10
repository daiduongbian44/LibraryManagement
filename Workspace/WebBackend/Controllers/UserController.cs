using BLLs;
using Commons;
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

    }
}