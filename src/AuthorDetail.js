import React from "react";

// Components
import BookTable from "./BookTable";
import { observer } from "mobx-react";

// Stores
import authorStore from "./stores/authorStore";
import bookStore from "./stores/bookStore";
import AddBookModal from "./AddBookModal";

const AuthorDetail = props => {
  const authorID = props.match.params.authorID;
  const author = authorStore.getAuthorById(authorID);
  const authorName = `${author.first_name} ${author.last_name}`;

  const books = author.books.map(bookID => bookStore.getBookById(bookID));

  return (
    <div>
      <div>
        <h3>{authorName}</h3>
        <img
          src={author.imageUrl}
          className="img-thumbnail img-fluid"
          alt={authorName}
        />
      </div>
      {/* see bookStore.js line# 43 to see what changed */}
      <BookTable books={books} />
      {/* we want to send it to book form */}
      {/*initially we used props.author however it was not defined therefore we used author in line number 13 */}
      <AddBookModal author={author} />
    </div>
  );
};

export default observer(AuthorDetail);
