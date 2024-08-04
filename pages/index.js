'use client';
import { useState } from "react";
import jwt from "jsonwebtoken";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure CSS is imported

export default function Home() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts

    const id = Math.trunc(Math.random() * 1000000);
    const account = { id };
    const SECRET = "this is a secret";
    const token = jwt.sign(account, SECRET);
    let message = `http://localhost:3000/chat/${token}`;

    const strapiData = {
      data: {
        id,
        username: user,
        email,
        token,
      },
    };

    try {
      // Sending data to Strapi
      const strapiResponse = await fetch("http://localhost:1337/api/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(strapiData),
      });
      const strapiResult = await strapiResponse.json();
      console.log(strapiResult);

      // Sending email using API route
      const emailResponse = await fetch("/api/mail", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'shivaniyadavguru@gmail.com',
          message,
        }),
      });
      const emailResult = await emailResponse.json();

      if (emailResponse.ok) {
        console.log("Email sent successfully:", emailResult);
        toast.success("Login successfully, link sent to your email!");
      } else {
        console.log("Failed to send email:", emailResult);
        toast.error("Failed to send email.");
      }
    } catch (err) {
      console.error("Error:", err.message);
      toast.error("An error occurred.");
    } finally {
      setLoading(false); // Set loading to false when the request completes
    }

    setEmail("");
    setUser("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <form className="bg-white p-12 rounded-2xl shadow-2xl w-full max-w-md" onSubmit={handlesubmit}>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Login</h1>
        
        <div className="mb-6">
          <label htmlFor="user" className="block text-gray-700 mb-2">Username:</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <i className="fas fa-user text-gray-400 text-lg"></i>
            </span>
            <input
              type="text"
              id="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              style={{
                fontSize: '18px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease-in-out'
              }}
            />
          </div>
        </div>
        
        <div className="mb-8">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <i className="fas fa-envelope text-gray-400 text-lg"></i>
            </span>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              style={{
                fontSize: '18px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease-in-out'
              }}
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          style={{
            fontSize: '18px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease-in-out'
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2 text-white animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path d="M4 12a8 8 0 01.5-2.3m1.7-2.7A8 8 0 0112 4a8 8 0 018 8H4z" fill="currentColor"></path>
              </svg>
              Loading...
            </span>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  );
}
