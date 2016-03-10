using Commons;
using DALs.Context;
using Dapper;
using Models.Author;
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

        /// <summary>
        /// Return all books from database
        /// </summary>
        /// <returns></returns>
        public List<BookModel> GetAllBooks()
        {
            const string procName = "cat_Get_Books";
            const string procAuthorItem = "cat_Get_AuthorItems_ByBookID";
            try
            {
                var con = DatabaseContext.getInstance().Connection;
                var res = con.Query<BookModel>(procName, null, commandType: CommandType.StoredProcedure);
                var listBook = res.ToList();

                // find-author
                foreach(var item in listBook)
                {
                    var param1 = new DynamicParameters();
                    param1.Add("@BookID", item.BookID);
                    var listAuthor = con.Query<AuthorModel>(procAuthorItem, param1, commandType: CommandType.StoredProcedure).ToList();
                    item.ListAuthor = listAuthor;
                }
                return listBook;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
