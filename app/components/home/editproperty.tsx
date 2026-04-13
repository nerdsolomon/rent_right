import React, { useEffect, useRef, useState } from "react";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";
import { type Property } from "~/types";
import { location } from "~/services";
import { FaImage } from "react-icons/fa";

interface Prop {
  property: Property;
}

export const EditProperty = ({ property }: Prop) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose: () => setIsOpen(false) });

  const [formData, setFormData] = useState<Property>(property);
  const [images, setImages] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const { updateProperty } = useData();

  // Load existing property data when opened
  useEffect(() => {
    if (isOpen) {
      setFormData(property);
      setImages(property.imageUrls || []);
    }
  }, [isOpen, property]);

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    Promise.all(
      fileArray.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          }),
      ),
    ).then((newImages) => {
      setImages((prev) => [...prev, ...newImages]);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateProperty({
      ...formData,
      imageUrls: images,
    });

    setIsOpen(false);
  };

  const states = formData.country
    ? Object.keys(location[formData.country] || {})
    : [];

  const cities =
    formData.country && formData.state
      ? location[formData.country]?.[formData.state] || []
      : [];

  return (
    <>
      {/* Open Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="block w-full px-4 py-2 text-left rounded-lg hover:bg-gray-100"
      >
        Edit
      </button>

      {/* Modal */}
      {isOpen && (
  <div className="fixed absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
    <div
      ref={modalRef}
      className="bg-white rounded-2xl shadow-lg w-[95%] md:w-[700px] p-6 animate-fadeIn max-h-[90vh] overflow-y-auto scrollbar-hidden"
    >
      {/* Header (same as Add) */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="font-bold text-lg text-purple-600">
            Update Property
          </p>
          <p className="text-xs text-gray-400">
            Update your property details
          </p>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-black"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="col-span-2">
            <label className="text-sm text-gray-600">Title*</label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="text"
              placeholder="Title"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Type + Listing + Price + Duration */}
          <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
            <div>
              <label className="text-sm text-gray-600">
                Property type*
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as Property["type"],
                  })
                }
              >
                <option>Type</option>
                <option value="apartment">Apartment</option>
                <option value="building">Building</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Listing Type*
              </label>
              <select
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.listingType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    listingType:
                      e.target.value as Property["listingType"],
                  })
                }
              >
                <option>Select Type</option>
                <option value="rental">Rental</option>
                <option value="sale">Sale</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600">Price*</label>
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="number"
                placeholder="Price"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: Number(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Duration (only for rental)
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.duration}
                disabled={formData.listingType !== "rental"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration:
                      e.target.value as Property["duration"],
                  })
                }
              >
                <option>Duration</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">State*</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                value={formData.state}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    state: e.target.value,
                    city: "",
                  })
                }
              >
                <option>State</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600">City*</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              >
                <option>City</option>
                {cities.map((city: string, index: number) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="col-span-2 py-2">
            <label className="text-sm text-gray-600">Description*</label>
            <textarea
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />
          </div>

          {/* Image Upload (same UX as Add) */}
          <div
            onClick={() => fileRef.current?.click()}
            className="flex gap-2 items-center cursor-pointer p-2 rounded-lg"
          >
            <FaImage className="text-xl text-purple-600" />
            <span className="hover:text-purple-600">
              Upload photos
            </span>
            <input
              className="hidden"
              type="file"
              accept="image/*"
              multiple
              ref={fileRef}
              onChange={handleImageUpload}
            />
          </div>

          {/* Preview */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-3 py-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full shadow hover:bg-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Submit */}
          <div className="col-span-2">
            <button
              className="bg-purple-600 px-4 py-2 text-white w-full hover:bg-purple-800 rounded-lg"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}
    </>
  );
};