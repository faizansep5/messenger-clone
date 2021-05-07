import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, Input } from "@material-ui/core";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setusername] = useState("");
  //For database
  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
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

  const sendMessage = (event) => {
    //all the logic to send a message
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
    event.preventDefault();
  };
  return (
    <div className="App">
      <img
        className="app__img"
        src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"
        alt="Facebook-messenger"
      />
      <h1 className="app__title">Hello Programmers!💻</h1>
      <h2>Welcome {username}</h2>
      <form className="app__form">
        <FormControl className="app-formControl">
          <Input
            className="app__input"
            placeholder="Enter a message..."
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />

          <IconButton
            className="app__iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      {/* Displaying messages */}
      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
