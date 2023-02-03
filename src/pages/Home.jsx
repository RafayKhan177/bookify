import { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import CardGroup from "react-bootstrap/CardGroup";
import BookCard from "../components/BookCard";

const Home = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs));
  }, []);
  
  return (
    <div className="main-container my-5">
      <h1 className="my-3">Books</h1>
      <CardGroup className="cards-main-div">
        {books.map((book) => (
          <BookCard key={book.id} id={book.id} {...book.data()} />
        ))}
      </CardGroup>
    </div>
  );
};

export default Home;
