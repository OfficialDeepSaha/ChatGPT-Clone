import { useEffect, useRef, useState } from "react";
import styles from "../styles/ChatGPT.module.css";
import chatgptlogo from "../Assets/chatgptlogo.png";
import chatgptlogo2 from "../Assets/chatgptlogo2.png";
import userlogo from "../Assets/userlogo.png";
import PulseLoader  from "react-spinners/PulseLoader";


const ChatGPT = ({ onRecentData }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const autoScroll = useRef(null);
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState([]);
  const [sendInitiated, setSendInitiated] = useState(false);
  const suggestion1 =
    "Suggest fun activities for a family of 4 to do indoors on a rainy day";
  const suggestion2 =
    "Compare marketing strategies for sunglasses for Gen Z and Millennials";
  const suggestion3 = "Tell me a fun fact about the Roman Empire";
  const suggestion4 =
    "Write a SQL Query that adds a status column to an Orders table";

  const secretKey = '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';

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSuggestion1 = () => {
    setInput(suggestion1);
    setSendInitiated(true);
  };

  const handleSuggestion2 = () => {
    setInput(suggestion2);
    setSendInitiated(true);
  };

  const handleSuggestion3 = () => {
    setInput(suggestion3);
    setSendInitiated(true);
  };

  const handleSuggestion4 = () => {
    setInput(suggestion4);
    setSendInitiated(true);
  };

  useEffect(() => {
    if (autoScroll.current) {
      autoScroll.current.scrollIntoView();
    }
  }, [messages]);

  useEffect(() => {
    onRecentData(recent);
    if (sendInitiated) {
      setInput(input);
      handleResponse();
      setSendInitiated(true);
    }
  }, [sendInitiated, input, recent]);

  const handleResponse = async () => {
    if (input) {
      let url = "https://api.openai.com/v1/chat/completions";

      let token = `Bearer ${secretKey}`;
      let model = "gpt-4o";
      setRecent((prevRecent) => [...prevRecent, input]);
      const text = input;
      setInput("");
      setMessages([...messages, { content: text, role: "user" }]);
      setLoading(!loading);
      let messagesToSend = [
        ...messages,
        {
          role: "user",
          content: text,
        },
      ];

      let res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          messages: messagesToSend,
        }),
      });
      let resjson = await res.json();
      if (resjson) {
        let newAllMessages = [...messagesToSend, resjson.choices[0].message];

        setMessages(newAllMessages);
        setInput("");
        setLoading(false);
      }
    }
  };
  const status = `"status"`;
  const orders = `"orders"`;

  const handleEnter = async (e) => {
    if (e.key == "Enter") await handleResponse();
  };

  return (
    <div className={styles.rightSection}>
      <div className={styles.chatgptversion}>
        <p className={styles.text1}>
          ChatGPT <span>3.5</span>{" "}
        </p>
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
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>

      {messages.length > 0 ? (
        <div className={styles.messages}>
          {messages.map((msg, index) => (
            <div key={index} className={styles.message}>
              <img
                src={msg.role === "user" ? userlogo : chatgptlogo2}
                width={30}
                height={30}
                alt=""
                style={{ borderRadius: 50, marginLeft: 100 }}
              />
              <div className={styles.details}>
                <h2>{msg.role === "user" ? "You" : "ChatGPT"}</h2>
                <p value={input}>{msg.content}</p>
                <div ref={autoScroll} />
              </div>
            </div>
          ))}

          {loading ? (
            <div className={styles.message}>
              <img
                src={chatgptlogo2}
                width={30}
                height={30}
                alt=""
                style={{ borderRadius: 50, marginLeft: 100 }}
              />
              <div className={styles.details}>
                <h2>ChatGPT</h2>
                <PulseLoader  color="#36d7b7" loading={loading} size={6.5} />
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className={styles.nochat}>
          <div className={styles.s1}>
            <img src={chatgptlogo} alt="chatgpt" height={50} width={50} />
            <h1>How can I help you today?</h1>
          </div>
          <div className={styles.s2}>
            <div onClick={handleSuggestion1} className={styles.suggestioncard}>
              <h2>Suggest fun activities</h2>
              <p>for a family of 4 to do indoors on a rainy day</p>
            </div>
            <div onClick={handleSuggestion2} className={styles.suggestioncard}>
              <h2>Compare marketing strategies</h2>
              <p>for sunglasses for Gen Z and Millennials</p>
            </div>
            <div onClick={handleSuggestion3} className={styles.suggestioncard}>
              <h2>Tell me a fun fact</h2>
              <p>about the Roman Empire</p>
            </div>
            <div onClick={handleSuggestion4} className={styles.suggestioncard}>
              <h2>Write a SQL Query</h2>
              <p>
                that adds a {status} column to an {orders} table
              </p>
            </div>
          </div>
        </div>
      )}

      <div className={styles.bottomsection}>
        <div className={styles.messagebar}>
          <input
            type="text"
            placeholder="Message ChatGPT..."
            onChange={handleInput}
            value={input}
            onKeyDown={handleEnter}
          />

          <svg
            // onClick={handleResponse}
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleResponse}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            // style={input.length > 0 ? { cursor: "pointer" } : {}}
            type="submit"
             fill={input.length > 0 ? "red" : "#333333"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            color="#19c37d"
            className={styles.settings}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
        </div>

        <p style={{ color: "whitesmoke", fontSize: "12px", gap: "2px" }}>
          ChatGPT can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
};

export default ChatGPT;
