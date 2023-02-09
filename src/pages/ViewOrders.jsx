import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import CardGroup from "react-bootstrap/CardGroup";
import BookCard from "../components/BookCard";

const ViewOrders = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (firebase.isLoggedIn && firebase.user) {
      firebase.fetchMyBooks(firebase.user.uid).then((books) => {
        setBooks(books);
        setIsLoading(false);
      });
    }
  }, [firebase]);

  if (!firebase.isLoggedIn)
    return (
      <>
        <h1>Please Log In or Sign Up</h1>
      </>
    );
  if (!firebase.user)
    return (
      <>
        <div className="loading-main-div">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      </>
    );
  if (isLoading)
    return (
      <div className="loading-main-div">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );

  return (
    <>
      <div className="main-container container my-5">
        <h1>View Your Books</h1>
        <CardGroup className="cards-main-div">
          {books.map((book) => (
            <BookCard link={`/books/orders/${book.id}`} key={book.id} id={book.id} {...book.data()} />
          ))}
        </CardGroup>
      </div>
    </>
  );
};

export default ViewOrders;
