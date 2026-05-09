"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; text: string }[]
  >([
    {
      role: "bot",
      text: "Hi! I am the VIK Chatbot. Ask me anything about BME, courses, or GDG events! (This is a placeholder, the real chatbot API will be connected later.)",
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: message }]);
    setMessage("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Thanks for your message! The chatbot API is not connected yet. This is a placeholder response that will be replaced when the Python chatbot microservice is integrated.",
        },
      ]);
    }, 500);
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-4 sm:right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-google-border flex flex-col z-50 overflow-hidden">
          <div className="bg-google-blue text-white px-4 py-3 flex items-center justify-between">
            <span className="font-semibold text-sm">VIK Chatbot</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm p-2 rounded-lg max-w-[85%] ${
                  m.role === "user"
                    ? "bg-google-blue text-white ml-auto"
                    : "bg-google-light text-google-dark"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-google-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 text-sm border border-google-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-google-blue"
              />
              <button
                onClick={handleSend}
                className="bg-google-blue text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                aria-label="Send"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 sm:right-6 w-14 h-14 bg-google-blue text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center z-50"
        aria-label="Open chat"
      >
        {open ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>
    </>
  );
}
