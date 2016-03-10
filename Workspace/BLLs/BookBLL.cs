using DALs;
using Models.Book;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLLs
{
    public class BookBLL
    {

        private BookDal _dal;

        public BookBLL()
        {
            _dal = new BookDal();
        }

        /// <summary>
        /// Save a book to db
        /// </summary>
        /// <param name="book"></param>
        /// <returns></returns>
        public int SaveBook(BookModel book)
        {
            return _dal.SaveBook(book);
        }

        /// <summary>
        /// Return all books from database
        /// </summary>
        /// <returns></returns>
        public List<BookModel> GetAllBooks()
        {
            return _dal.GetAllBooks();
        }
    }
}
