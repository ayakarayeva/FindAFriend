import React from "react";
import Add from "../images/Add.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db} from "../firebase"; //we have created it in firebase.js file
import { doc, setDoc } from "firebase/firestore"; 
import  { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, Link } from "react-router-dom";

export const Register = () => {
  const [err, setErr] = useState(false); //if there is an error update state
   const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); //not to tefresh the page after submitting
    const displayName = e.target[0].value; //index shows the order of input taken
    const email = e.target[1].value;
    const password= e.target[2].value;
    const file = e.target[5].files[0];
    const area= e.target[3].value;
    const instagram= e.target[4].value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      

      const storageRef = ref(storage, displayName);
      
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
              area,
              instagram,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
             navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            //setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      //setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">FindAFriend</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Enter name" />
          <input required type="email" placeholder="Enter email" />
          <input required type="password" placeholder="Enter password" />
          <input required type="text" placeholder="Enter city" />
          <input required type="text" placeholder="Enter instagram" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span> Add your avatar</span>
          </label>

          <button>Sign up</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>Do you have an account? <Link to="/login" >Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
