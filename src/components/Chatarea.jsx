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
import OpenAI from "openai";

function Chatarea() {
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_KEY,
    dangerouslyAllowBrowser: true, // This is also the default, can be omitted
  });
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [thinking, setThinking] = useState(false);
  const submitMessage = async () => {
    await addDoc(collection(db, "chats/fordemo/messages"), {
      message: message,
      createdAt: Timestamp.now(),
      from: "user",
    });
    setMessage("");
    setThinking(true);
    getAiRes().then(async (res) => {
      console.log(res["message"]["content"]);
      await addDoc(collection(db, "chats/fordemo/messages"), {
        message: res["message"]["content"],
        createdAt: Timestamp.now(),
        from: "ai",
      });
      setThinking(false);
    });
  };

  const getAiRes = async () => {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Marv is a factual chatbot that is also sarcastic.",
        },
        { role: "user", content: message },
      ],
      model: "ft:gpt-3.5-turbo-1106:personal::8iem0ksh",
      max_tokens: 50,
    });
    console.log(completion.choices[0]);
    return completion.choices[0];
  };

  useEffect(() => {
    const q = query(
      collection(db, "chats/fordemo/messages"),
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
      {chats.length == 0 && (
        <Chat
          from="ai"
          key={31531324153}
          num={"1"}
          item={{
            id: 97975649,
            data: {
              message:
                "The token limit is upto 50 so there maybe some sentences that might be incomplete. Powered by openAI.",
            },
          }}
          thinking={false}
        />
      )}
      <div>
        {chats.map((item, index) => (
          <Chat
            from={item.data.from}
            key={item.data.id}
            num={index + 1}
            item={item}
          />
        ))}
        {thinking && (
          <Chat
            from="ai"
            key={31531324153}
            num={100000}
            item={{ id: 97975649 }}
            thinking={true}
          />
        )}
      </div>
      <div style={{ height: "20px", width: "100%", marginTop: "30px" }}>
        ---
      </div>
      <div
        className="items-center flex"
        style={{ position: "fixed", width: "96%", bottom: "0px" }}
      >
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
