using AngularMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularMVC.Interface
{
    interface IBook
    {
        IEnumerable<Book> GetAll();
        bool Update(Book newbook);
        bool Delete(int id);
        Book Add(Book newbook);
        Book Get(int id);
    }
}
