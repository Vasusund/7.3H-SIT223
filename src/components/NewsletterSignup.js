import React, { useState } from "react";

function NewsletterSignUp() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Thanks for subscribing! Check your inbox or span.");
        setEmail("");
      } else {
        setMessage("Subscription failed. Try again later.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="newsletter">
      <h3>Subscribe to our Newsletter</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
      {message && <p className="newsletter-msg">{message}</p>}
    </div>
  );
}

export default NewsletterSignUp;
