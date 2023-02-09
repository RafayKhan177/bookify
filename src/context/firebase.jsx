import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyDeVXBhIgv1ehb9GVqFBdLjJV8e6cGBWgQ",
  authDomain: "bookify-94d78.firebaseapp.com",
  projectId: "bookify-94d78",
  storageBucket: "bookify-94d78.appspot.com",
  messagingSenderId: "127971795419",
  appId: "1:127971795419:web:a2a553918107a0f1b047fe",
  measurementId: "G-V7JF5KCBWE",
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signinUserWithEmailAndPassword = (email, password) => {
    // signInWithEmailAndPassword(firebaseApp, email, password);
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  const signinWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider)
      .then(() => {
        alert("SIGN IN SUCCES");
      })
      .catch((error) => {
        // alert("Error");
        console.log(error);
      });
  };

  const handleCreateNewListings = async (name, isbn, price, coverPic) => {
    console.log("Book Published");
    const imageRef = ref(
      storage,
      `uploads/images/${Date.now()}-${coverPic.name}`
    );
    const uploadResult = await uploadBytes(imageRef, coverPic);
    return await addDoc(collection(firestore, "books"), {
      name,
      isbn,
      price,
      imageURL: uploadResult.ref.fullPath,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  const listAllBooks = () => {
    return getDocs(collection(firestore, "books"));
  };

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const getBookById = async (id) => {
    const docRef = doc(firestore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };

  const placeOrder = async (bookId, quantity) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await addDoc(collectionRef, {
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      quantity: Number(quantity),
    });
    return result;
  };

  // const fetchMyBooks = async (userId) => {
  //   const collectionRef = collection(firestore, "books");
  //   const q = query(collectionRef, where("userID", "==", userId));
  //   const result = await getDocs(q);
  //   return result;
  // };

  const fetchMyBooks = async (userId) => {
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userID", "==", userId));
    const result = await getDocs(q);
    // console.log(result)
    return result.docs;
  };

  const getOrders = async (bookId) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await getDocs(collectionRef);
    return result;
  };

  // const updateUserInfo = async (userId, displayName, phoneNumber) => {
  //   try {
  //     const userRef = firestore.collection("books").doc(userId);
  //     await userRef.update({
  //       displayName,
  //       phoneNumber
  //     });
  //     console.log("User info updated successfully");
  //   } catch (error) {
  //     console.error("Error updating user info", error);
  //   }
  // };
  

  const isLoggedIn = !!user;

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signinWithGoogle,
        isLoggedIn,
        handleCreateNewListings,
        listAllBooks,
        getImageURL,
        getBookById,
        placeOrder,
        fetchMyBooks,
        user,
        getOrders,
        // updateUserInfo
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
