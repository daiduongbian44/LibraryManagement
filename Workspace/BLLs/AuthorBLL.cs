using DALs;
using Models.Author;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLLs
{
    public class AuthorBLL
    {
        private AuthorDal _dal;

        public AuthorBLL()
        {
            _dal = new AuthorDal();
        }

        /// <summary>
        /// Save an author to db
        /// </summary>
        /// <param name="author"></param>
        public int SaveAuthor(AuthorModel author)
        {
            return _dal.SaveAuthor(author);
        }

        /// <summary>
        /// Get all authors from db
        /// </summary>
        /// <returns></returns>
        public List<AuthorModel> GetListAuthors()
        {
            return _dal.GetListAuthors();
        }
    }
}
