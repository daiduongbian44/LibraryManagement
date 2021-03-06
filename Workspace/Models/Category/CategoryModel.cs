﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Models.Category
{
    [XmlRoot(ElementName = "Category")]
    public class CategoryModel
    {
        public long CategoryID { get; set; }
        public string CategoryName { get; set; }
        public short CategoryLevel { get; set; }
        public string ImageURL { get; set; }
        public int StatusTypeID { get; set; }
        public Nullable<int> ParentID { get; set; }
    }
}
