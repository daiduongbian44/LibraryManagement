using BLLs;
using Commons;
using Models.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebBackend.Controllers
{
    [RoutePrefix("api/category")]
    public class CategoryController : ApiController
    {

        [Authorize]
        [HttpPost]
        [Route("savecategoryfield")]
        public IHttpActionResult SaveCategoryField(CategoryModel category)
        {
            var result = new ApiResult()
            {
                Status = Constant.API_RESULT_SUCCESS,
                Data = null
            };
            try
            {
                CategoryBLL bll = new CategoryBLL();
                category.CategoryLevel = 1;
                int value = bll.SaveCategory(category);
                if (value <= 0)
                {
                    result.Status = Constant.API_RESULT_ERROR;
                    result.Messages = "Chuyên ngành đã tồn tại.";
                }
            }
            catch (Exception ex)
            {
                result.Status = Constant.API_RESULT_ERROR;
                result.Messages = "Xảy ra lỗi khi thêm chuyên ngành.";
            }

            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        [Route("savecategorysubject")]
        public IHttpActionResult SaveCategorySubject(CategoryModel category)
        {
            var result = new ApiResult()
            {
                Status = Constant.API_RESULT_SUCCESS,
                Data = null
            };
            try
            {
                CategoryBLL bll = new CategoryBLL();
                category.CategoryLevel = 2;
                int value = bll.SaveCategory(category);
                if (value <= 0)
                {
                    result.Status = Constant.API_RESULT_ERROR;
                    result.Messages = "Loại sách đã tồn tại.";
                }
            }
            catch (Exception ex)
            {
                result.Status = Constant.API_RESULT_ERROR;
                result.Messages = "Xảy ra lỗi khi thêm loại sách.";
            }

            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        [Route("getcategoryfields")]
        public IHttpActionResult GetListCategoryField()
        {
            var result = new ApiResult()
            {
                Status = Constant.API_RESULT_SUCCESS,
                Data = null
            };
            try
            {
                CategoryBLL bll = new CategoryBLL();
                result.Data = bll.GetListCategoryField();
            }
            catch (Exception ex)
            {
                result.Status = Constant.API_RESULT_ERROR;
                result.Messages = "Xảy ra lỗi khi lấy dữ liệu.";
            }
            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        [Route("getcategorysubjects")]
        public IHttpActionResult GetListCategorySubject()
        {
            var result = new ApiResult()
            {
                Status = Constant.API_RESULT_SUCCESS,
                Data = null
            };
            try
            {
                CategoryBLL bll = new CategoryBLL();
                result.Data = bll.GetListCategorySubject();
            }
            catch (Exception ex)
            {
                result.Status = Constant.API_RESULT_ERROR;
                result.Messages = "Xảy ra lỗi khi lấy dữ liệu.";
            }
            return Ok(result);
        }
    }
}
