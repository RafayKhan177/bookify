import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";

// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// function BookCard(props) {
//   const firebase = useFirebase();
// const navigate = useNavigate()

//   const [url, setUrl] = useState(null);
//   useEffect(() => {
//     firebase.getImageURL(props.imageURL).then((url) => setUrl(url));
//   }, []);

//   return (
//     <Card style={{ width: "16rem" }}>
//       <Card.Img
//         style={{ height: "12rem",  objectFit: "cover" }}
//         variant="top"
//         src={url}
//       />
//       <Card.Body>
//         <Card.Title>{props.name}</Card.Title>
//         <Card.Text>
//           This book has title {props.name} and this book is sold by{" "}
//           {props.displayName} and this book Costs Rs.{props.price}.
//         </Card.Text>
//         <Button onClick={e=> navigate(`/book/view/${props.id}`)} variant="primary">View</Button>
//       </Card.Body>
//     </Card>
//   );
// }

// export default BookCard;
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function BookCard(props) {
  const navigate = useNavigate();
  const firebase = useFirebase();

  const [url, setUrl] = useState(null);
  useEffect(() => {
    firebase.getImageURL(props.imageURL).then((url) => setUrl(url));
  }, []);

  return (
    <Card
      sx={{
        maxWidth: 300,
        margin: ".4rem",
        backgroundColor: "rgb(49, 49, 49)",
        color: "aliceblue",
      }}
      onClick={(e) => navigate(`/book/view/${props.id}`)}
      className="my-3"
    >
      <CardActionArea>
        <CardMedia component="img" height="180" image={url} alt="Card IMG" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "rgb(173, 173, 173)" }}>
            Title: {props.name} <br /> 
            Book Sold & Writed By: {props.displayName} <br />
            book Costs: {props.price} Rs.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
