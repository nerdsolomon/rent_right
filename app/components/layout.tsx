import { useState } from "react";
import { profile, users } from "~/data";
import PostForm from "./postform";
import Friends from "./friends";
import Postcard from "./postcard";
import Profilecard from "./profilecard";
import Bot from "./bot";

const Layout = () => {
  const [posts, setPost] = useState<string[]>([]);
  const [user, setUser] = useState(profile);
  const [friends, setFriends] = useState(users);

  return (
    <>
      <nav className="border-b border-gray-300 p-4 flex justify-between">
        <div className="text-lg text-blue-500 font-bold">LLM ChatBot</div>
        <a className="font-bold text-lg text-blue-600">
          {user.firstName} {user.lastName}
        </a>
      </nav>

      <div className="grid grid-cols-3 p-2 gap-4 justify-center items-start w-full">
        <div className="p-2">
          <PostForm setPost={setPost} />
          <Friends friends={friends} setFriends={setFriends} />
        </div>

        <div className="p-4 h-screen overflow-y-auto">
          {posts.map((post, index) => (
            <Postcard key={index} profile={user} post={post} />
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-2xl">
          <Profilecard user={user} setUser={setUser} />
          <Bot user={user} friends={friends} posts={posts} />
        </div>
      </div>
    </>
  );
};

export default Layout