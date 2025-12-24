import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import useClickOutside from "~/hooks/useClickOutside";
import { emptyProperty, images, useData, type Property } from "~/hooks/useData";

export const AddProperty = () => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  const [formData, setFormData] = useState<Property>(emptyProperty);
  const { properties, setProperties } = useData();

  const addProperty = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProperties([
      ...properties,
      {
        id: Math.random(),
        location: formData.location,
        title: formData.title,
        description: formData.description,
        imageUrl: images[Math.floor(Math.random() * 2)],
      },
    ]);
    setFormData(emptyProperty);
    onClose(false);
  };

  return (
    <>
      <button
        onClick={() => onClose(true)}
        className="fixed bottom-8 right-8 border border-white bg-blue-400 text-white hover:bg-blue-800 px-4 py-4 lg:px-6 lg:py-3 rounded-full shadow-lg flex items-center gap-2 transition"
      >
        <FaPlus className="text-md" />
        <span className="hidden lg:inline font-medium">Add Property</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-lg w-[90%] lg:w-[650px] max-h-[100vh] p-6"
          >
            <div className="flex justify-between mb-4">
              <p className="font-bold">Add Property</p>
              <button
                onClick={() => onClose(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4" onSubmit={addProperty}>
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Title"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Location"
                required
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />

              <textarea
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
