import React from "react";
import Typing from "./Typing";

function Chat({ from, num, item, thinking = false }) {
  return (
    <div
      key={item.id}
      className="items-end flex flex-row"
      style={{
        marginTop: num == "1" ? "auto" : "10px",
        gap: "8px",
        width: "calc(100vw - 37px )",
      }}
    >
      {from == "user" ? (
        <img className="flex h-8" src="images/user.svg" />
      ) : (
        <img className="flex h-8" src="images/ai.svg" />
      )}

      <div
        style={{
          backgroundColor: "#424769",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        {thinking ? <Typing /> : <p>{item.data.message}</p>}
      </div>
    </div>
  );
}

export default Chat;
