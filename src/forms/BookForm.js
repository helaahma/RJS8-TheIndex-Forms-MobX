import React, { Component } from "react";
import { observer } from "mobx-react";
//Store
import bookStore from "../stores/bookStore";

class BookForm extends Component {
  state = {
    title: "",
    color: ""
  };
  submitBook = async event => {
    event.preventDefault();
    await bookStore.addBook(this.state, this.props.author);
    if (!bookStore.errors) {
      this.props.closeModal();
    }
  };

  bookHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.submitBook}>
          {bookStore.errors && (
            <div className="alert alert-danger" role="alert">
              {bookStore.errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}

          <input
            onChange={this.bookHandler}
            type="text"
            className="form-control"
            name="title"
          />

          <select name="color" onChange={this.bookHandler}>
            <option value="red">Red</option>
            <option selected value="white">
              White
            </option>
            <option value="black">Black</option>
            <option value="pink">Pink</option>
          </select>
          <br />
          <br />
          <input type="submit" value="Submit Book" />
        </form>
      </div>
    );
  }
}

export default observer(BookForm);
