using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;

namespace Commons
{
    public class Utils
    {

        /// <summary>
        /// Serialize an Object to XML
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="data"></param>
        /// <returns></returns>
        public static string SerializeToXML<T>(T data)
        {
            XmlSerializer serialize = new XmlSerializer(typeof(T));
            using (StringWriter sww = new StringWriter())
            using (XmlWriter writer = XmlWriter.Create(sww))
            {
                serialize.Serialize(writer, data);
                var xml = sww.ToString();
                return xml;
            }
        }
    }
}
