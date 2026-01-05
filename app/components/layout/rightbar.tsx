const Rightbar = () => {
  return (
    <aside className="hidden lg:block h-screen w-[250px] bg-blue-100 border-l border-gray-200 bg-gray-100">
      <div className="border border-gray-200 shadow-lg p-4 rounded-lg m-2 space-y-2">
        <p className="font-bold text-xl text-gray-500 text-center">Become an Owner</p>
        <p className="text-gray-400 text-center">Post your property for sale and rent</p>
        <button className="bg-blue-500 text-white font-bold w-full rounded-lg py-2 hover:bg-blue-700">Get started</button>
      </div>
    </aside>
  );
};

export default Rightbar;
