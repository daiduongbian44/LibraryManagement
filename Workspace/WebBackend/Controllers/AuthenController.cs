using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLLs;
using Commons;
using Models.User;

namespace WebBackend.Controllers
{
    [RoutePrefix("api/authen")]
    public class AuthenController : ApiController
    {

        [Route("saveuser")]
        [HttpPost]
        public IHttpActionResult SaveUser(UserModel user)
        {
            var result = new ApiResult()
            {
                Status = Constant.API_RESULT_SUCCESS,
                Data = null
            };

            // add user
            // UserBLL bll = new UserBLL();
            // bll.SaveUser(user);

            return Ok(result);
        }
    }
}
