using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Models.Book
{
    [XmlRoot(ElementName = "Book")]
    public class BookModel
    {
        public long BookID { get; set; }
        public string BookName { get; set; }
        public long CategoryID { get; set; }
        public string CategoryName { get; set; }
        public string BookDesc { get; set; }
        public string ImageURL { get; set; }
        public int Quantity { get; set; }
        public int HardCover { get; set; }
        public decimal BookPrice { get; set; }
        public string Publisher { get; set; }
        public string Language { get; set; }
        public string ISBN { get; set; }
        public int StatusTypeID { get; set; }
        public List<Author.AuthorModel> ListAuthor { get; set; }
    }
}
