import { useFirebase } from "../context/firebase";
import React, { useState } from "react";

const UserProfilePage = () => {
  const firebase = useFirebase();

  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleUpdateUserInfo=()=>{
    firebase.updateUserInfo(firebase.user.email, displayName, phoneNumber);
  }
  return (
    <div>
      {/* <input
        type="text"
        placeholder="Display Name"
        value={displayName}
        onChange={(event) => setDisplayName(event.target.value)}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.target.value)}
      />
      <button onClick={handleUpdateUserInfo}>Update User Info</button> */}
    </div>
  );
};

export default UserProfilePage;
