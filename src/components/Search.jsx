import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const Search = () => {
  const [area, setArea] = useState("");
  const [user, setUser] = useState(null);
  const [users,setUsers]= useState({});
  let sortedData = {};


  
  const [err, setErr] = useState(false);

  

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("area", "==", area)
    );

    try {
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        
        // setUser(doc.data());
        //sortedData.push(doc.data());
        //console.log(sortedData);
       //setUsers(doc.data());
       //console.log(users);
       setUser(doc.data());
        
     });
    } catch (err) {
     setErr(true);
   }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };


  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Enter area name"
          onKeyDown={handleKey}
          onChange={(e) => setArea(e.target.value)}
          value={area}
        />
      </div>
      {err && <span>User not found!</span>}

        {user && 
        <div className="userChat">
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
            <br></br>
            <span>{user.instagram}</span>
          </div>
        </div>
     }
   
      
    </div>
  );
};

export default Search;