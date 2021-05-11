import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./Message.css";

const Message = ({ message, username }) => {
  const isUser = username === message.username;
  return (
    <div className={`message__card ${isUser && `message__user`}`}>
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {!isUser && `${message.username || "Unknown user"} :`}
            {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Message;
