import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import ChatRoom from "../../components/index";

export default function Chat() {
  const router = useRouter();
  const SECRET = "this is a secret"; // JWT Secret
  const [done, setDone] = useState("");
  const [username, setUsername] = useState("");

  const token = router.query.token; // Getting the token from the URL
  useEffect(() => {
    if (!router.isReady) return console.log("Loading... Please wait");
    try {
      const payload = jwt.verify(token, SECRET);
      async function fetchData() {
        const response = await fetch(`http://localhost:1337/api/accounts/${payload.id}`);
        if (response.ok) {
          const account = await response.json();
          console.log(account);
          setUsername(account.data.attributes.username);
          if (token!== account.data.attributes.token) {
            return router.push("/");
          }
          console.log(username);
        } else {
          console.log(`Error: ${response.status} ${response.statusText}`);
          return router.push("/");
        }
      }
      fetchData();
      setDone("done");
    } catch (error) {
      console.log("error", error.message);
      router.push("/"); // redirecting the user to the home page if an error occured
    }
  }, [token, username]);
  return (
    <div>
      {done !== "done" ? ( // Waiting for access to be granted
        <h1>Verifying token..... Please wait</h1>
      ) : (
        <ChatRoom username={username} />
      )}
    </div>
  );
}
