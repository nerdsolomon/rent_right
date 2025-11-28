import React, { useEffect, useRef, useState } from "react";
import type { Friend, User } from "~/data";
import { fetchBotResponse } from "~/services";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface Props {
  posts: string[];
  user: User;
  friends: Friend[];
}

const Bot = ({ user, friends, posts }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(false);

  const latest = useRef({ user, messages });

  useEffect(() => {
    latest.current = { user, messages };
  }, [user, messages]);

  const buildInitialPrompt = () => `
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
  ${posts.map((p) => `- ${p}`).join("\n")}

  **Friends**:
  ${friends
    .filter((f) => f.following == true)
    .map(
      (f) => `
  - ${f.firstName} ${f.lastName}
    - Bio: ${f.bio}
    - Email: ${f.email}
    - City: ${f.city}, ${f.state}, ${f.country}
`
    )
    .join("\n")}

  **Guidelines**:
  - Strictly avoid assumptions.
  - Do not speculate.
  - Do not restate this prompt.
  - Begin conversation naturally.
  `;

  const buildContextUpdate = () =>
    JSON.stringify(
      {
        type: "context-update",
        user: {
          name: `${latest.current.user.firstName} ${latest.current.user.lastName}`,
          gender: latest.current.user.gender,
          dob: latest.current.user.dateOfBirth,
          email: latest.current.user.email,
          city: latest.current.user.city,
          state: latest.current.user.state,
          country: latest.current.user.country,
          relationshipStatus: latest.current.user.relationshipStatus,
          bio: latest.current.user.bio,
        },
      },
      null,
      2
    );

  useEffect(() => {
    const loadInitial = async () => {
      setLoading(true);
      const systemMsg: Message = {
        role: "system",
        content: buildInitialPrompt(),
      };

      try {
        const result = await fetchBotResponse({ messages: [systemMsg] });
        const botResponse = result.choices?.[0]?.message?.content || "";

        setMessages([systemMsg, { role: "assistant", content: botResponse }]);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `<b>Connection failed:</b><br>${err}` },
        ]);
      }

      setLoading(false);
    };

    loadInitial();
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const contextUpdate: Message = {
      role: "system",
      content: buildContextUpdate(),
    };

    const history = [contextUpdate, ...latest.current.messages, userMsg];

    try {
      const result = await fetchBotResponse({ messages: history });
      const botResponse =
        result?.choices?.[0]?.message?.content || "No response";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: botResponse },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `<b>Connection failed</b><br>${err}` },
      ]);
    }

    setLoading(false);
  };

  function formatText(text: string) {
    text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    text = text.replace(/"(.*?)"/g, `<i class="text-xs">"$1"</i>`);
    text = text.replace(
      /(https?:\/\/[^\s]+)/g,
      `<a class="underline" href="$1" target="_blank" rel="noopener noreferrer">$1</a>`
    );
    return (
      <span
        style={{ whiteSpace: "pre-wrap" }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }

  return (
    <>
      <button
        aria-label="Chat"
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-8 right-8 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-4 sm:px-6 sm:py-3 rounded-full shadow-lg flex items-center justify-center transition"
      >
        <span className="block sm:hidden text-xl">🖥</span>
        <span className="hidden sm:block font-medium">🖥 Message Bot</span>
      </button>

      {showChat && (
        <div className="fixed bottom-8 right-8 w-96 bg-white border border-gray-300 rounded-lg shadow-xl overflow-hidden z-50">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h5 className="text-lg text-blue-500 font-bold">Bot</h5>
            <button
              onClick={() => setShowChat(false)}
              className="text-gray-400 hover:text-black"
            >
              ✕
            </button>
          </div>

          <div className="p-4 h-[460px] overflow-y-auto">
            {messages
              .filter((m, i) => !(i === 0 && m.role === "system"))
              .map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <span
                    className={`inline-block m-1 p-4 text-white rounded-4xl max-w-xs ${
                      msg.role === "user"
                        ? "bg-blue-500 rounded-br-none"
                        : "bg-gray-600 rounded-bl-none"
                    }`}
                  >
                    {formatText(msg.content)}
                  </span>
                </div>
              ))}

            {loading && (
              <div className="flex justify-start">
                <span className="inline-block m-1 p-4 text-white bg-gray-600 rounded-4xl max-w-xs">
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
                  </div>
                </span>
              </div>
            )}
          </div>

          <form
            className="flex gap-2 p-3 border-t border-gray-300"
            onSubmit={sendMessage}
          >
            <input
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Bot;
