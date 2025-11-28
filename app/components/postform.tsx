import { useState } from "react";

interface Prop {
  setPost : (value: any) => void
}

const PostForm = ({setPost} : Prop) => {
  const [input, setInput] = useState("");

  const addPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    setPost((prev: string) => [...prev, input.trim()]);
    setInput("");
  };
  
  return (
    <form className="gap-2 p-3 border border-gray-300 rounded-lg" onSubmit={addPost}>
      <textarea
        required
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Create Post"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Share
      </button>
    </form>
  );
};

export default PostForm;
