import { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { useParams } from "react-router-dom";

const Details = () => {
  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);

  const firebase = useFirebase();
  const params = useParams();

  useEffect(() => {
    firebase.getBookById(params.bookId).then((val) => setData(val.data()));
  }, []);

  useEffect(() => {
    if (data) {
      const imageURL = data.imageURL;
      firebase.getImageURL(imageURL).then((url) => setURL(url));
    }
  }, [data]);

  if (data == null) {
    return <div className="loading-main-div"><div className="lds-ripple"><div></div><div></div></div></div> ;
  }

  return (
      <>
      <h1 className="my-5 text-center">Book {data.name} Details</h1>
    <div className="container detail-container my-3">
      <div className="detail-img">
        <img className="img-fluid" src={url} alt="" />
      </div>
      <div className="detail-content">
        <h5>Details</h5>
        <p>Book Title: {data.name}</p>
        <p>Price is: {data.price} Rs</p>
        <p>ISBN Numer: {data.isbn}</p>
        <h5>Owner Details</h5>
        <p>Owner is:{data.displayName}</p>
        <p>Email: {data.userEmail}</p>
        <button className="button-large">Parchase</button>
      </div>
    </div></>
  );
};

export default Details;
