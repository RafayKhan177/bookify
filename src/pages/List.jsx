import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/firebase";

const ListingPage = () => {
  const [name, setName] = useState("");
  const [isbn, setIsbn] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState();

  const firebase = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.handleCreateNewListings(name, isbn, price, coverPic);
    // console.log(firebase)
    setName("");
    setIsbn("");
    setPrice("");
    setCoverPic("");
    alert("Book Added");
  };

  return (
    <div className="container main-container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Book Name"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            onChange={(e) => setIsbn(e.target.value)}
            value={isbn}
            type="text"
            placeholder="ISBN Number"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="text"
            placeholder="Price"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cover Photo</Form.Label>
          <Form.Control
            onChange={(e) => setCoverPic(e.target.files[0])}
            type="file"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <button
          className="button-large"
          type="submit"
          // onClick={() => {
          //   setName(""), setIsbn(""), setPrice(""), setCoverPic("");
          // }}
        >
          Create
        </button>
      </Form>
    </div>
  );
};

export default ListingPage;
