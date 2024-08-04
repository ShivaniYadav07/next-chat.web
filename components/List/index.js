import React from "react";
import styled from "styled-components";
import { List as AntdList, Avatar } from "antd";
import socket from "socket.io-client"; // Ensure this is imported correctly

function List(props) {
  const users = props.users.data;
  const handleClick = async (id, socketid) => {
    const io = socket("http://localhost:1337");
    try {
      await fetch(`http://localhost:1337/api/active-users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      io.emit("kick", { socketid }, (error) => {
        if (error) return alert(error);
      });
      setTimeout(() => window.location.reload(), 3000);
    } catch (e) {
      window.location.reload();
    }
  };

  return (
    <StyledList>
      <ListHeading>Active Users</ListHeading>
      <AntdList
        itemLayout="horizontal"
        dataSource={users}
        renderItem={(user) => (
          <AntdList.Item
            className="border-b border-gray-200 hover:bg-gray-50"
            actions={[
              user.attributes.users !== "Admin" && props.username === "Admin" && (
                <button
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                  onClick={() => handleClick(user.id, user.attributes.socketid)}
                >
                  Delete
                </button>
              ),
            ]}
          >
            <AntdList.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<span className="text-gray-900">{user.attributes.users}</span>}
            />
          </AntdList.Item>
        )}
      />
    </StyledList>
  );
}

export default List;

const StyledList = styled.div`
  margin-right: 10px;
  flex: 0 0 35%;
  padding: 20px;
  background-color: #fff; /* Added background color for consistency */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
`;

const ListHeading = styled.h2`
  color: #757591;
  font-size: 20px;
  font-style: oblique;
  border-bottom: 1px solid #757591;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;
