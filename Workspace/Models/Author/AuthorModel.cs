using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Models.Author
{

    [XmlRoot(ElementName = "Author")]
    public class AuthorModel
    {
        public long AuthorID { get; set; }
        public string AuthorName { get; set; }
        public string ImageURL { get; set; }
        public int StatusTypeID { get; set; }
    }
}
