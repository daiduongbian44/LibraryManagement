using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.User
{
    public class UserPassword
    {
        public string PasswordHash { get; set; }
        public int RoleID { get; set; }
        public int StatusTypeID { get; set; }
    }
}
