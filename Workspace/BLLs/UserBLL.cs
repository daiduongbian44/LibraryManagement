using DALs;
using Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLLs
{
    public class UserBLL
    {

        /// <summary>
        /// Save an user to db
        /// </summary>
        /// <param name="user"></param>
        public void SaveUser(UserModel user)
        {
            UserDal dal = new UserDal();
            dal.SaveUser(user);
        }
    }
}
