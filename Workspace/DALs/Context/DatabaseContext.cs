using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DALs.Context
{
    public class DatabaseContext : IDisposable
    {
        private string connectionString;
        private SqlConnection con;
        private static DatabaseContext _instance = null;

        public SqlConnection Connection
        {
            get { return con; }
        }

        private DatabaseContext()
        {
            connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            con = new SqlConnection(connectionString);
        }

        public static DatabaseContext getInstance()
        {
            if(_instance == null)
            {
                _instance = new DatabaseContext();
            }
            return _instance;
        }

        public void Dispose()
        {
            if(con != null && con.State == System.Data.ConnectionState.Open)
            {
                con.Close();
            }
        }
    }
}
