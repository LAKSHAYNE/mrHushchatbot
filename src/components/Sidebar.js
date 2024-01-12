import React from "react";

function Sidebar({ topics }) {
  return (
    <div
      className="w-60 p-2 "
      style={{ backgroundColor: "#7077A1", height: "calc(100vh - 58px ) " }}
    >
      {topics.map((topic) => (
        <div
          className="flex rounded m-2 items-center p-2"
          style={{
            backgroundColor: "#2D3250",
            cursor: "pointer",
          }}
        >
          <img
            src="images/write.svg"
            style={{ height: "25px", paddingRight: "6px", overflowX: "auto" }}
          />
          <p>{topic.length > 15 ? topic.substring(0, 10) + "..." : topic}</p>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
