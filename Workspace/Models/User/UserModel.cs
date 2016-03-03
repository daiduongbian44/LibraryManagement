using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Models.User
{
    [XmlRoot(ElementName = "User")]
    public class UserModel
    {
        public long UserID { get; set; }
        public string UserName { get; set; }
        public string PassWord { get; set; }
        public int RoleID { get; set; }
        public short StatusTypeID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Nullable<System.DateTime> BirthDay { get; set; }
        public string Address { get; set; }
        public long PhoneNumber { get; set; }
        public string Email { get; set; }
        public string ImageURL { get; set; }
        public Nullable<System.DateTime> LastLogin { get; set; }
    }
}
