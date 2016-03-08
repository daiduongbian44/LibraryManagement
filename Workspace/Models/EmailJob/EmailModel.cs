using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Models.EmailJob
{
    [XmlRoot(ElementName = "Email")]
    public class EmailModel
    {
        public long EmailID { get; set; }
        public string EmailTo { get; set; }
        public string Body { get; set; }
        public string Title { get; set; }
        public bool IsSent { get; set; }
    }
}
