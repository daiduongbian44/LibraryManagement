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
                param.Add("@UserID", 0);
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
    }
}
