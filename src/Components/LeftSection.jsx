import React from "react";
import chatgptlogo from "../Assets/chatgptlogo.png";
import userlogo from "../Assets/userlogo.png";
import styles from "../styles/LeftSection.module.css";
import stars from "../Assets/stars.png";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const LeftSection = ({recentData}) => {
  const allChats = [
    {
      id: 1,
      chatName: "User Assistance Request",
      time: "Today",
    },
  ];
const clearChat = (e) => {
e.preventDefault();
 window.location.reload();
 console.log("chat cleared")


}

  return (
    <div className={styles.leftSection}>
      <div className={styles.newChat}>
        <div>
          <img src={chatgptlogo} alt="ChatGPT" width={33} height={33} />
          <p className={styles.text3} onClick={clearChat}>
            New chat
          </p>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </div>
      <div className={styles.allChats}>
        {allChats.map((chat) => (
          <div key={chat.id} className={styles.chat}>
            <h1 className={styles.text2}>{chat.time}</h1>
            <p className={styles.text1}>{chat.chatName}</p>
            {recentData && recentData.map(i =>
            <div key={i}>
              <p className={styles.text1} style={{marginTop: "15px"}}>
               {[i]}
              </p>
             
            </div>
          )}
          </div>
        ))}
      </div>
      <div className={styles.newChat}>


<div className={styles.text4} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <AutoAwesomeIcon 
              sx={{
                fontSize: "1.5rem",
                border: "1px solid #8f8f8f;",
                borderRadius: "90%",
                padding: "5px",
                
              }}
            ></AutoAwesomeIcon>
            <span >
              Upgrade plan
              <div>
              <span style={{fontSize:"12.2px" , color:"gray" , fontWeight:"600"}}>Get GPT-4, DALL·E, and more</span>
              </div>
            </span>
          </div>



<div className={styles.lft_container} >
       
          <img
            src={userlogo}
            alt="ChatGPT"
            width={33}
            height={33}
            style={{ borderRadius: 50 }}
          />
          <p className={styles.text1} >Deep Saha</p>
        </div>
     </div>
    </div>
  );
};

export default LeftSection;
