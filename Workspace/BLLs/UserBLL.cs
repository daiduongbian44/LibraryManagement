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
        private UserDal _dal;

        public UserBLL()
        {
            _dal = new UserDal();
        }

        /// <summary>
        /// Save an user to db
        /// </summary>
        /// <param name="user"></param>
        public int SaveUser(UserModel user)
        {
            
            return _dal.SaveUser(user);
        }

        public List<UserModel> GetUsers()
        {
            return _dal.GetListUsers();
        }

        public List<RoleModel> GetRoles()
        {
            return _dal.GetListRoles();
        }

        /// <summary>
        /// Update last logint
        /// </summary>
        /// <param name="user"></param>
        public void UpdateLastLogin(long userID)
        {

            _dal.UpdateLastLogin(userID);
        }

        /// <summary>
        /// Return password for an username-admin
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        public UserPassword GetPasswordUserAdmin(string username)
        {
            return _dal.GetPasswordUserAdmin(username);
        }

        /// <summary>
        /// Return password for an email-reader
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public string GetPasswordUserReader(string email)
        {
            return _dal.GetPasswordUserReader(email);
        }

        /// <summary>
        /// Return an user by UserID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public UserModel GetUserById(int userId)
        {
            return _dal.GetUserById(userId);
        }

        /// <summary>
        /// Check username and email of insert-update-user must unique
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="email"></param>
        /// <returns>Return true if existed user</returns>
        public bool CheckUserExist(string userName, string email)
        {
            return _dal.CheckUserExist(userName, email);
        }

        /// <summary>
        /// Return an user by UserName
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        public UserModel GetUserByUserName(string username)
        {
            return _dal.GetUserByUserName(username);
        }
    }
}
