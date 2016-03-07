using Commons;
using DALs.Context;
using Dapper;
using Models.EmailJob;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DALs.EmailJob
{
    public class EmailDAL
    {
        public long SaveEmail(EmailModel email)
        {
            const string procName = "cat_Save_Author";
            try
            {
                var xml = Utils.SerializeToXML<EmailModel>(email);
                var param = new DynamicParameters();
                param.Add("@EmailID", email.EmailID, dbType: DbType.Int32, direction: ParameterDirection.ReturnValue);
                param.Add("@XML", xml);
                
                var con = DatabaseContext.getInstance().Connection;
                con.Execute(procName, param, commandType: CommandType.StoredProcedure);
                return param.Get<long>("EmailID");
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
