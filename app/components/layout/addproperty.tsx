import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";
import { images } from "~/services/asset.services";
import { emptyProperty, type Property } from "~/types";
import { location } from "~/services";

export const AddProperty = () => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  const [formData, setFormData] = useState<Property>(emptyProperty);
  const { properties, setProperties, currentUser } = useData();

  const countries = Object.keys(location);
  const states = formData.country ? Object.keys(location[formData.country] || {}) : [];
  const cities = formData.country && formData.state ? location[formData.country]?.[formData.state] || [] : [];

  const addProperty = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProperties([
      ...properties,
      {
        id: Math.random(),
        country: formData.country,
        state: formData.state,
        city: formData.city,
        title: formData.title,
        price: formData.price,
        description: formData.description,
        imageUrl: images[Math.floor(Math.random() * 2)],
        owner: currentUser.id,
      },
    ]);
    setFormData(emptyProperty);
    onClose(false);
  };

  return (
    <>
      <button
        onClick={() => onClose(true)}
        className="fixed bottom-8 right-8 border-4 border-white bg-blue-400 text-white hover:bg-blue-800 px-4 py-4 lg:px-6 lg:py-3 rounded-full shadow-lg flex items-center gap-2 transition"
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
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Title"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                placeholder="Price"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
              />
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
              >
                <option>Country</option>
                {countries.map((country, index) => <option key={index} value={country}>{country}</option>)}
              </select>
              {formData.country && (
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                >
                  <option>State</option>
                  {states.map((state, index) => <option key={index} value={state}>{state}</option>)}
                </select>
              )}
              {formData.country && formData.state && (
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                >
                  <option>City</option>
                  {cities.map((city: string, index: number) => <option key={index} value={city}>{city}</option>)}
                </select>
              )}
              <textarea
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
