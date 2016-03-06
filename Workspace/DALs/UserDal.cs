using Commons;
using DALs.Context;
using Dapper;
using Models.User;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DALs
{
    public class UserDal
    {

        /// <summary>
        /// Save an user to db
        /// </summary>
        /// <param name="user"></param>
        public void SaveUser(UserModel user)
        {
            const string procName = "scr_Save_User";
            try
            {
                var xml = Utils.SerializeToXML<UserModel>(user);
                var param = new DynamicParameters();
                param.Add("@UserID", user.UserID);
                param.Add("@XML", xml);

                param.Add("@Return", dbType: DbType.Int32, direction: ParameterDirection.ReturnValue);
                var con = DatabaseContext.getInstance().Connection;
                con.Execute(procName, param, commandType: CommandType.StoredProcedure);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Update lastlogin datetime of user
        /// </summary>
        /// <param name="user"></param>
        public void UpdateLastLogin(long userID)
        {
            const string procName = "scr_Update_LastLogin";
            try
            {                
                var param = new DynamicParameters();
                param.Add("@UserID", userID);
                var con = DatabaseContext.getInstance().Connection;
                con.Execute(procName, param, commandType: CommandType.StoredProcedure);
            }
            catch (Exception)
            {
                throw;
            }
        }


        /// <summary>
        /// Return password for an username-admin
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        public UserPassword GetPasswordUserAdmin(string username)
        {
            if (string.IsNullOrEmpty(username)) throw new ArgumentException("Username is empty");
            const string procName = "scr_Get_PassWord_ByUserName";
            try
            {
                var param = new DynamicParameters();
                param.Add("@UserName", username);

                var con = DatabaseContext.getInstance().Connection;
                var users = con.Query<UserPassword>(procName, param, commandType: CommandType.StoredProcedure);
                if (users.Count() <= 0) return null;
                return (users.First());
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        /// <summary>
        /// Return password for an email-reader
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public string GetPasswordUserReader(string email)
        {
            if (string.IsNullOrEmpty(email)) throw new ArgumentException("Email is empty");
            return "123456";
        }

        /// <summary>
        /// Return an user by UserID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public UserModel GetUserById(int userId)
        {
            return new UserModel();
        }

        /// <summary>
        /// Return an user by UserName
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        public UserModel GetUserByUserName(string username)
        {
            return new UserModel() {
                UserID = 1,
                UserName = "manh", 
            };
        }

        /// <summary>
        /// Check username and email of insert-update-user must unique
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="email"></param>
        /// <returns>Return true if existed user</returns>
        public bool CheckUserExist(string userName, string email)
        {
            return false;
        }

    }
}
