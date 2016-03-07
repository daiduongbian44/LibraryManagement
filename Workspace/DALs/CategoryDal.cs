using Commons;
using DALs.Context;
using Dapper;
using Models.Category;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DALs
{
    public class CategoryDal
    { 

        /// <summary>
        /// Save a category to db
        /// </summary>
        /// <param name="category"></param>
        /// <returns></returns>
        public int SaveCategory(CategoryModel category)
        {
            const string procName = "scr_Save_Category";
            try
            {
                var xml = Utils.SerializeToXML<CategoryModel>(category);
                var param = new DynamicParameters();
                param.Add("@CategoryID", category.CategoryID, dbType: DbType.Int32, direction: ParameterDirection.InputOutput);
                param.Add("@XML", xml);

                param.Add("@Return", dbType: DbType.Int32, direction: ParameterDirection.ReturnValue);
                var con = DatabaseContext.getInstance().Connection;
                con.Execute(procName, param, commandType: CommandType.StoredProcedure);
                return param.Get<int>("@CategoryID");
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Return all fields (CategoryLevel = 1)
        /// </summary>
        /// <returns></returns>
        public List<CategoryModel> GetListCategoryField()
        {
            return GetListCategoryByLevel(1);
        }

        /// <summary>
        /// Return all fields (CategoryLevel = 2)
        /// </summary>
        /// <returns></returns>
        public List<CategoryModel> GetListCategorySubject()
        {
            return GetListCategoryByLevel(2);
        }

        /// <summary>
        /// Return list categories by category-level
        /// </summary>
        /// <param name="level"></param>
        /// <returns></returns>
        private List<CategoryModel> GetListCategoryByLevel(int level)
        {
            const string procName = "cat_Get_Categories_ByCategoryLevel";
            try
            {
                var param = new DynamicParameters();
                param.Add("@CategoryLevel", level);

                var con = DatabaseContext.getInstance().Connection;
                var res = con.Query<CategoryModel>(procName, param, commandType: CommandType.StoredProcedure);
                return res.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
