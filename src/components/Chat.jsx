import React from "react";

function Chat({ num, id, from, item }) {
  return (
    <div
      className="items-end flex flex-row"
      style={{
        marginTop: num == "1" ? "auto" : "10px",
        gap: "8px",
        width: "calc(100vw - 500px )",
      }}
    >
      <img className="flex h-8" src="images/ai.svg" />
      <div
        style={{
          backgroundColor: "#424769",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <p>{item.data.message}</p>
      </div>
    </div>
  );
}

export default Chat;
