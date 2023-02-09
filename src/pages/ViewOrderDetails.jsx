import { useFirebase } from "../context/firebase";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ViewOrderDetailsPage = () => {
  const [orders, setOrders] = useState([]);

  const firebase = useFirebase();
  const params = useParams();

  useEffect(() => {
    firebase.getOrders(params.bookId).then((orders) => {
      console.log(orders.docs);
      setOrders(orders.docs);
    });
  }, []);

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  return (
    <div className="container main-container my-5">
      <h1>Order Details</h1>
      <div className="d-flex flex-row" style={{flexWrap:"wrap" ,justifyContent:"center"}}>
        {orders.map((order) => {
          const data = order.data();
          return (
            // <div ><h5>{data.displayName} {data.quantity} {data.userEmail}</h5></div>
            <Card key={order.id} sx={{ minWidth: 275, backgroundColor: "rgb(27, 27, 27)" ,margin:"1rem"}}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Buyer Name : {data.displayName}
                </Typography>{" "}
                <br />
                <Typography sx={{ mb: 1.5 }} color="">
                  Books Quantity : {data.quantity}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color=""
                  gutterBottom
                >
                  Buyer Email {data.userEmail}
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ViewOrderDetailsPage;
