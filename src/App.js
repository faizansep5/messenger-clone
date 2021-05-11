import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import SendIcon from "@material-ui/icons/Send";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setusername] = useState("");
  //For database
  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snap) => {
        setMessages(
          snap.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);
  //For prompt
  useEffect(() => {
    setusername(prompt("Enter your name please"));
    // If it's [] blank, this useEffect runs only once when the App component loads.
  }, []);

  //For scroll
  const dummy = useRef();

  const sendMessage = (event) => {
    //all the logic to send a message
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
    event.preventDefault();

    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <h2>{username}</h2>
      </header>
      <section>
        {/* Displaying messages */}
        <main>
          {messages.map(({ id, message }) => (
            <Message key={id} username={username} message={message} />
          ))}
          <span ref={dummy}></span>
          <span style={{ marginBottom: "100px" }}></span>
        </main>
        <form>
          <input
            placeholder="Enter a message..."
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
          <button type="submit" disabled={!input} onClick={sendMessage}>
            <SendIcon />
          </button>
        </form>
      </section>
    </div>
  );
}

export default App;
