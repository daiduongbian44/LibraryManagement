using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.History {
    public class BorrowHistoryUserModel {
        public int BookID { get; set; }
        public string BookName { get; set; }

        public int BorrowQuantity { get; set; }
        public int ReturnQuantity { get; set; }
        public string OrderItemStatusTypeName { get; set; }
        public DateTime BorrowDate { get; set; }
        public DateTime ReturnDate { get; set; }
    }
}
