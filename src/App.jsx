import ChatGPT from "./Components/ChatGPT";
import LeftSection from "./Components/LeftSection";
import styles from "./App.module.css";
import { useState } from "react";


function App() {
  const [recentData , setRecentData] = useState([]);
  const handleRecentInput = (data) => {

    setRecentData(data)
  }

  return (
    <div className={styles.mainpage}>
      <div className={styles.leftOut}>
        <LeftSection recentData = {recentData} />
      </div>
      <div className={styles.rightOut}>
        <ChatGPT onRecentData={handleRecentInput} />
      </div>
    </div>
  );
}

export default App;
