using AngularMVC.Interface;
using AngularMVC.Models;
using AngularMVC.Repository;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AngularMVC.Controllers
{
    public class BookController : ApiController
    {
        static readonly IBook repositorydb = new BookRepository();

        // GET api/<controller>
        public IEnumerable GetAllBooks()
        {
            return repositorydb.GetAll();
        }

        // GET api/<controller>/5
        public Book Get(int id)
        {
            return repositorydb.Get(id);
        }

        // POST api/<controller>
        public Book Post(Book book)
        {
            return repositorydb.Add(book);
        }

        // PUT api/<controller>/5
        public bool Put(Book book)
        {
            return repositorydb.Update(book);
        }

        // DELETE api/<controller>/5
        public bool Delete(int id)
        {
            return repositorydb.Delete(id);
        }
    }
}