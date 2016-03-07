using DALs;
using Models.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLLs
{
    public class CategoryBLL
    {
        private CategoryDal _dal;

        public CategoryBLL()
        {
            _dal = new CategoryDal();
        }

        /// <summary>
        /// Save a category to db
        /// </summary>
        /// <param name="category"></param>
        /// <returns></returns>
        public int SaveCategory(CategoryModel category)
        {
            return _dal.SaveCategory(category);
        }

        /// <summary>
        /// Return all fields (CategoryLevel = 1)
        /// </summary>
        /// <returns></returns>
        public List<CategoryModel> GetListCategoryField()
        {
            return _dal.GetListCategoryField();
        }

        /// <summary>
        /// Return all fields (CategoryLevel = 2)
        /// </summary>
        /// <returns></returns>
        public List<CategoryModel> GetListCategorySubject()
        {
            return _dal.GetListCategorySubject();
        }
    }
}
