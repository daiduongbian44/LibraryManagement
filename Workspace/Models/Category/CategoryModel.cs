using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Category
{
    public class CategoryModel
    {
        public long CategoryID { get; set; }
        public string CategoryName { get; set; }
        public short CategoryLevel { get; set; }
        public string ImageURL { get; set; }
        public Nullable<int> ParentID { get; set; }
    }
}
