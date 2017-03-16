using AngularMVC.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AngularMVC.Models;

namespace AngularMVC.Repository
{
    public class BookRepository : IBook
    {
        AngularTestEntities db = new AngularTestEntities();

        public Book Add(Book newbook)
        {
            var book = new Book();
            book =db.Book.Add(newbook);
            db.SaveChanges();
            return book;
        }

        public bool Delete(int id)
        {
            bool delete = false;
            if (db.Book.Any(p => p.Id == id))
            {
                var book = db.Book.Single(p => p.Id == id);
                db.Book.Remove(book);
                db.SaveChanges();
                delete = true;
            }
            return delete;
        }

        public Book Get(int id)
        {
            return db.Book.Single(p => p.Id == id); ;
        }

        public IEnumerable<Book> GetAll()
        {
            try
            {
                var list = db.Book.ToList();

                return db.Book;
            }
            catch (Exception ex)
            {
                var m = ex.Message;
                throw;
            }
        }

        public bool Update(Book newbook)
        {
            bool updated = false;
            if (newbook == null)
            {
                throw new ArgumentNullException("item");
            }
            else
            {
                var products = db.Book.Single(a => a.Id == newbook.Id);
                products.Name = newbook.Name;
                products.Category = newbook.Category;
                products.Price = newbook.Price;
                db.SaveChanges();
                updated = true;
            }
            // TO DO : Code to update record into database
            return updated;
        }
    }
}