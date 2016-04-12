using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DALs.Context
{
    public class DatabaseContext
    {
        private string connectionString;
        private static DatabaseContext _instance = null;

        public SqlConnection Connection
        {
            get { return new SqlConnection(connectionString); ; }
        }

        private DatabaseContext()
        {
            connectionString = ConfigurationManager.ConnectionStrings["DefaultConnectionManhNQ"].ConnectionString;
        }

        public static DatabaseContext getInstance()
        {
            if(_instance == null)
            {
                _instance = new DatabaseContext();
            }
            return _instance;
        }
    }
}
