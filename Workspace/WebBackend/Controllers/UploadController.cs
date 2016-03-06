using Commons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace WebBackend.Controllers
{
    [RoutePrefix("api/upload")]
    public class UploadController : ApiController
    {
        [Authorize]
        [Route("image")]
        [HttpPost]
        public IHttpActionResult UploadImage()
        {
            var result = new ApiResult()
            {
                Status = Constant.API_RESULT_SUCCESS
            };
            Guid guid = Guid.NewGuid();
            var fileText = guid.ToString();

            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count == 1)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    var filePath = HttpContext.Current.Server.MapPath("~/Uploads/" + fileText + postedFile.FileName);
                    postedFile.SaveAs(filePath);

                    result.Data = "/Uploads/" + fileText + postedFile.FileName;
                    break;
                }
            }
            else
            {
                result.Status = Constant.API_RESULT_ERROR;
                result.Messages = "Somethings wrong.";
            }
            return Ok(result);

        }
    }
}
