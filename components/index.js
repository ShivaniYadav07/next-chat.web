import React, { useEffect, useRef, useState } from "react";
import { Input } from "antd";
import "antd/dist/antd.css";
import "font-awesome/css/font-awesome.min.css";
import Header from "./Header";
import Messages from "./Messages";
import List from "./List";
import socket from "socket.io-client";
import {
  ChatContainer,
  StyledContainer,
  ChatBox,
  StyledButton,
  SendIcon,
} from "../pages/chat/styles";
function ChatRoom({ username, id }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const welcomeRef = useRef();
  const io = socket("http://localhost:1337");//Connecting to Socket.io backend
  let welcome;
  useEffect(() => {
    io.emit("join", { username }, (error) => { //Sending the username to the backend as the user connects.
      if (error) return alert(error);
    });
    io.on("welcome", async (data, error) => {//Getting the welcome message from the backend
      let welcomeMessage = {
        user: data.user,
        message: data.text,
      };
      welcomeRef.current = welcomeMessage;
      setMessages([welcomeMessage]);//Storing the Welcome Message
      await fetch("http://localhost:1337/api/messages")//Fetching all messages from Strapi
        .then(async (res) => {
          const response = await res.json();
          let arr = [welcome];
          response.data.map((one, i) => {
            arr = [...arr, one.attributes];
            setMessages((msgs) => arr);// Storing all Messages in a state variable
          });
        })
        .catch((e) => console.log(e.message));
    });
    io.on("message", async (data, error) => {//Listening for a message connection
      await fetch("http://localhost:1337/api/messages")
        .then(async (res) => {
          const response = await res.json();
          let arr = [welcome];
          response.data.map((one, i) => {
            arr = [...arr, one.attributes];
            setMessages((msgs) => arr);
          });
        })
        .catch((e) => console.log(e.message));
    });
    io.on("roomData", async (data) => {
      await fetch("http://localhost:1337/api/active-users").then(async (e) => {
        setUsers(await e.json());//Fetching and storing the users in the users state variable
      });
    })
  }, [username, io, welcome]);
  const sendMessage = (message) => {
    if (message) {
      io.emit("sendMessage", { message, user: username }, (error) => {// Sending the message to the backend
        if (error) {
          alert(error);
        }
      });
      setMessage("");
    } else {
      alert("Message can't be empty");
    }
  };
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleClick = () => {
    sendMessage(message);
  };
  return (
    <ChatContainer>
      <Header room="Group Chat" />
      <StyledContainer>
        <List users={users} id={id} usersname={username}>
        <ChatBox>
          <Messages messages={messages} username={username} />
          <Input
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={handleChange}
          />
          <StyledButton onClick={handleClick}>
            <SendIcon>
              <i className="fa fa-paper-plane" />
            </SendIcon>
          </StyledButton>
        </ChatBox>
        </List>
      </StyledContainer>
    </ChatContainer>
  );
}
export default ChatRoom;