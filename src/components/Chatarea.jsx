import React, { useEffect, useState } from "react";
import db from "../firebase";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  addDoc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import Chat from "./Chat";
function Chatarea() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const submitMessage = async () => {
    console.log(message);
    await addDoc(collection(db, "chats/school/messages"), {
      message: message,
      createdAt: Timestamp.now(),
      from: "user",
    });
    setMessage("");
  };

  useEffect(() => {
    const q = query(
      collection(db, "chats/school/messages"),
      orderBy("createdAt", "asc")
    );
    onSnapshot(q, (querySnapshot) => {
      setChats(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div
      className="w-screen items-baseline flex flex-col"
      style={{
        height: "calc(100vh - 58px )",
        padding: "10px 10px 0 10px",
        overflowX: "auto",
        flexFlow: "column noWrap",
      }}
    >
      {chats.map((item, index, id, from) => (
        <Chat num={index + 1} id={id} from={from} item={item} />
      ))}
      <div className="items-center flex w-full">
        <input
          value={message}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              submitMessage();
            }
          }}
          onChange={(e) => setMessage(e.target.value)}
          className="h-10 rounded w-full p-2"
          style={{ color: "black" }}
        />
        <img
          onClick={submitMessage}
          className="h-10 m-2"
          style={{ cursor: "pointer" }}
          src="images/send.svg"
        />
      </div>
    </div>
  );
}

export default Chatarea;
