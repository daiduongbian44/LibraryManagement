using Commons;
using DALs.Context;
using Dapper;
using Models.Book;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DALs
{
    public class BookDal
    {

        /// <summary>
        /// Save a book to db
        /// </summary>
        /// <param name="book"></param>
        /// <returns></returns>
        public int SaveBook(BookModel book)
        {
            const string procName = "cat_Save_Book";
            try
            {
                var xml = Utils.SerializeToXML<BookModel>(book);
                var param = new DynamicParameters();
                param.Add("@BookID", book.BookID, dbType: DbType.Int32, direction: ParameterDirection.InputOutput);
                param.Add("@XML", xml);

                param.Add("@Return", dbType: DbType.Int32, direction: ParameterDirection.ReturnValue);
                var con = DatabaseContext.getInstance().Connection;
                con.Execute(procName, param, commandType: CommandType.StoredProcedure);
                return param.Get<int>("@BookID");
            }
            catch (Exception)
            {
                throw;
            }
        }
        public bool ChangeBookStatus(long bookID, int statusTypeID)
        {
            const string procName = "cat_Change_ItemStatusType";
            try
            {
                var param = new DynamicParameters();
                param.Add("@BookID", bookID);
                param.Add("@StatusTypeID", statusTypeID);
                param.Add("@Result", dbType: DbType.Boolean, direction: ParameterDirection.InputOutput);

                var con = DatabaseContext.getInstance().Connection;
                con.Execute(procName, param, commandType: CommandType.StoredProcedure);
                return param.Get<bool>("@Result");
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
