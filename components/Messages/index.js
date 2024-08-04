import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message/";
import styled from "styled-components";

function Messages(props) {
  const { messages, username } = props;
  return (
    <ScrollToBottom>
      <StyledMessages>
        {messages.map((message, i) => (
          <Message key={i} message={message} username={username} />
        ))}
      </StyledMessages>
    </ScrollToBottom>
  );
}

export default Messages;

const StyledMessages = styled.div`
  padding: 5% 0;
  overflow: auto;
  flex: auto;
`;