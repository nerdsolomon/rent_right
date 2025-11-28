import React, { useEffect, useRef, useState } from 'react'
import type { Friend, User } from '~/data';
import { fetchBotResponse } from '~/services';

interface Message {
  content: string;
  role: string;
}

interface Prop {
  posts: string[];
  user: User;
  friends: Friend[];
}

const Bot = ({ user, friends, posts }: Prop) => {
  const [message, setMessage] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const refs = useRef({ message, user });

  useEffect(() => {
    refs.current.message = message;
    refs.current.user = user;
  }, [message, user]);

  useEffect(() => {
    const fetchInitialMessage = async () => {
      const prompt = `
          **Profile Information**
          - Name: ${user.firstName} ${user.lastName}
          - Email: ${user.email}
          - Gender: ${user.gender}
          - Date of Birth: ${user.dateOfBirth}
          - City: ${user.city}
          - State: ${user.state}
          - Country: ${user.country}
          - Relationship Status: ${user.relationshipStatus}
          - Bio: ${user.bio}

          **Recent Posts**:
            ${posts.map((post) => `- ${post}`).join("\n")}

          **Following**:
            ${friends
              .map((sp) => `
            - **${sp.firstName} ${sp.lastName}**
              - Bio: ${sp.bio}
              - Email: ${sp.email}
              - City: ${sp.city}
              - State: ${sp.state}
              - Country: ${sp.country}
            `).join("\n")}

            **Suggested Friends**:
            ${friends
              .map((sp) => `
            - **${sp.firstName} ${sp.lastName}**
              - Bio: ${sp.bio}
              - Relationship Status: ${sp.relationshipStatus}
              - Email: ${sp.email}
              - City: ${sp.city}
              - State: ${sp.state}
              - Country: ${sp.country}
            `).join("\n")}
            
          **Guidelines**:
            Strictly avoid assumptions or external knowledge.
            Do not speculate. If there's not enough context to make a recommendation, say so clearly.
            Do not respond to or restate this prompt — treat it as internal context.
          
          Now begin conversation naturally.
        `;

      const initialMessage: Message = { role: "system", content: prompt };
      const data = { messages: [initialMessage] };
      setLoading(true);
      try {
        const result = await fetchBotResponse(data);
        const responseText =
          result.choices?.[0]?.message?.content || "No response";
        setMessage([initialMessage, { role: "bot", content: responseText }]);
      } catch (error) {
        setMessage((prev) => [...prev, { role: "bot", content: `<b>Connection failed</b><br>${error}` }]);
      }
      setLoading(false);
    };
    fetchInitialMessage();
  }, []);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newUserMessage = { role: "user", content: input };
    setMessage((prev) => [...prev, newUserMessage]);
    setInput("");
    setLoading(true);
    const dynamicSystemContext = {
      role: "system",
      content: `Updated User Context

      The User's name was ${user.firstName} ${user.lastName}, now it is ${refs.current.user.firstName} ${refs.current.user.lastName}

      **Profile Details**:
      - Gender: ${refs.current.user.gender}
      - Date of Birth: ${refs.current.user.dateOfBirth}
      - Email: ${refs.current.user.email}
      - City: ${refs.current.user.city}
      - State: ${refs.current.user.state}
      - Country: ${refs.current.user.country}
      - Relationship Status: ${refs.current.user.relationshipStatus}
      - Bio: ${refs.current.user.bio}`,
    };
    const conversationHistory = [
      dynamicSystemContext,
      ...refs.current.message,
      newUserMessage,
    ].map((msg) => ({
      role: msg.role === "bot" ? "assistant" : msg.role,
      content: msg.content,
    }));
    const data = { messages: conversationHistory };
    try {
      const result = await fetchBotResponse(data);
      const responseText = result?.choices?.[0]?.message?.content;
      setMessage((prev) => [...prev, { role: "bot", content: responseText }]);
    } catch (error) {
      console.log(error);
      setMessage((prev) => [...prev, { role: "bot", content: `<b>Connection failed</b><br>${error}` }]);
    }
    setLoading(false);
  };

  function formatText(text: string) {
    text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    text = text.replace(
      /(".*?")/g,
      (match) => `<i style="font-size: smaller">${match}</i>`
    );
    text = text.replace(
      /(https?:\/\/[^\s]+)/g,
      (url) => `<a class="underline" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
    );
    return <span style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: text }}/>;
  }

  return (
    <>
      <button
        aria-label="Chat"
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-8 right-8 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-4 sm:px-6 sm:py-3 rounded-full shadow-lg flex items-center justify-center sm:space-x-2 transition duration-200 bg-transparent w-12 h-12 sm:w-auto sm:h-auto"
      >
        <span className="block sm:hidden text-xl">🖥</span>
        <span className="hidden sm:block font-medium">🖥 Message Bot</span>
      </button>
      {showChat && (
        <div className="fixed bottom-8 right-8 w-100 bg-white border border-gray-300 rounded-lg shadow-xl overflow-hidden z-50">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h5 className="text-lg text-blue-500 font-bold">Bot</h5>
            <button onClick={() => setShowChat(false)} className="text-gray-400 hover:text-black">✕</button>
          </div>
          <div className="p-4 h-105 overflow-y-auto">
            {message
              .filter((text, i) => !(i === 0 && text.role === "system"))
              .map((text, index) => (
                <div key={index} className={`flex ${ text.role === "user" ? "justify-end" : "justify-start"}`}>
                  <span
                    className={
                      `inline-block m-1 p-4 text-white rounded-4xl max-w-xs break-words ` +
                      (text.role === "user"
                        ? "bg-blue-500 rounded-br-none"
                        : "bg-gray-500 rounded-bl-none")
                    }
                  >
                    <p className="text-sm" key={index}>
                      {formatText(text.content)}
                    </p>
                  </span>
                </div>
              ))}
            {loading && (
              <div className="flex justify-start">
                <span className="inline-block m-1 p-4 text-white bg-gray-500 rounded-4xl max-w-xs">
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                  </div>
                </span>
              </div>
            )}
          </div>
          <form className="flex gap-2 p-3 border-t border-gray-300" onSubmit={sendMessage}>
            <input
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Bot;