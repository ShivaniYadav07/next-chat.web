import React from "react";
import { MessagesContainer, MessageBox, MessageText, SentBy } from "./styles";

function Message(props) {
  const { username, message: { user, message } } = props;
  let sentByCurrentUser = false;
  if (user === username) {
    sentByCurrentUser = true;
  }
  const background = sentByCurrentUser? "blue" : "dark";
  const textPosition = sentByCurrentUser? "end" : "start";
  const textColor = sentByCurrentUser? "white" : "dark";
  const sentBy = sentByCurrentUser? "right" : "left";

  return (
    <MessageBox style={{ background, textAlign: textPosition }}>
      <MessageText style={{ color: textColor }}>{message}</MessageText>
      <SentBy style={{ textAlign: sentBy }}>{user}</SentBy>
    </MessageBox>
  );
}

export default Message;