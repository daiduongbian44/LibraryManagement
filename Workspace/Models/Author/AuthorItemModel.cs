using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Author
{
    public class AuthorItemModel
    {
        public long AuthorID { get; set; }
        public long BookID { get; set; }
        public string AuthorName { get; set; }
        public string ImageURL { get; set; }
    }
}
