import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});
function errToArray(err) {
  return Object.keys(err).map(key => `${key}: ${err[key]}`);
}
class BookStore {
  books = [];

  query = "";

  loading = true;

  authors = [];

  fetchBooks = async () => {
    try {
      const res = await instance.get(
        "https://the-index-api.herokuapp.com/api/books/"
      );
      const books = res.data;
      this.books = books;
      this.loading = false;
    } catch (err) {
      console.error(err);
    }
  };
  //it says bad request because we didnt send ID therefore modify newbook in line# 33
  addBook = async (newBook, author) => {
    //This means we added author attribure to newBook with a value if author.id
    newBook.authors = [author.id];
    try {
      const res = await instance.post("/api/books/", newBook);
      const book = res.data;
      console.log(book);
      this.books.push(book);
      this.books.unshift(book);
      this.errors = null;
      //add the new book to author.books
      author.books.push(book.id);
    } catch (err) {
      this.errors = errToArray(err.response.data);
    }
  };

  get filteredBooks() {
    return this.books.filter(book => {
      return book.title.toLowerCase().includes(this.query.toLowerCase());
    });
  }

  getBookById = id => this.books.find(book => +book.id === +id);

  getBooksByColor = color =>
    this.filteredBooks.filter(book => book.color === color);
}

decorate(BookStore, {
  books: observable,
  query: observable,
  loading: observable,
  filteredBooks: computed
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;
