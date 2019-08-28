import React, { Component } from "react";
import { observer } from "mobx-react";
//Store
import bookStore from "../stores/bookStore";

class BookForm extends Component {
  state = {
    title: "",
    color: "",
    authors: []
  };
  submitBook = async event => {
    event.preventDefault();
    await bookStore.addBook(this.state);
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
            onChange={event => this.bookHandler(event)}
            type="text"
            className="form-control"
            name="title"
          />

          <select name="color" onChange={event => this.bookHandler(event)}>
            <option value="red">Red</option>
            <option selected value="white">
              White
            </option>
            <option value="black">Black</option>
            <option value="pink">Pink</option>
          </select>
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default observer(BookForm);
