using DALs.EmailJob;
using Models.EmailJob;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLLs
{
    public class EmailBLL
    {
        private EmailDAL _dal;

        public EmailBLL()
        {
            _dal = new EmailDAL();
        }

        public long SaveEmail(EmailModel email)
        {

            return _dal.SaveEmail(email);
        }
    }
}
