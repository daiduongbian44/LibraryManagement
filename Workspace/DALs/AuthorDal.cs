using Commons;
using DALs.Context;
using Dapper;
using Models.Author;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DALs
{
    public class AuthorDal
    {
        
        /// <summary>
        /// Save an author to db
        /// </summary>
        /// <param name="author"></param>
        public int SaveAuthor(AuthorModel author)
        {
            const string procName = "cat_Save_Author";
            try
            {
                var xml = Utils.SerializeToXML<AuthorModel>(author);
                var param = new DynamicParameters();
                param.Add("@AuthorID", author.AuthorID, dbType: DbType.Int32, direction: ParameterDirection.InputOutput);
                param.Add("@XML", xml);
                                
                var con = DatabaseContext.getInstance().Connection;
                con.Execute(procName, param, commandType: CommandType.StoredProcedure);

                return param.Get<int>("@AuthorID");
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Get all authors from db
        /// </summary>
        /// <returns></returns>
        public List<AuthorModel> GetListAuthors()
        {
            const string procName = "cat_Get_Authors";
            try
            {
                var param = new DynamicParameters();
                param.Add("@Return", dbType: DbType.Int32, direction: ParameterDirection.ReturnValue);
                var con = DatabaseContext.getInstance().Connection;
                var res = con.Query<AuthorModel>(procName, param, commandType: CommandType.StoredProcedure);
                return res.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
