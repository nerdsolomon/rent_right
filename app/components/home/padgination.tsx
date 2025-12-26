export const Padgination = () => {
  return (
    <div className="flex justify-between items-center py-6 text-gray-400 text-sm font-semibold">
      <button className="px-2 py-1 border border-gray-400 hover:bg-gray-400 hover:text-white rounded-lg">
        Back
      </button>
      <p>1 of 1</p>
      <button className="px-2 py-1 border border-gray-400 hover:bg-gray-400 hover:text-white rounded-lg">
        Next
      </button>
    </div>
  );
};
