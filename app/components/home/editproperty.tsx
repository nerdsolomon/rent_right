import React, { useEffect, useRef, useState } from "react";
import useClickOutside from "~/hooks/useClickOutside";
import { type Property } from "~/types";
import { location } from "~/services";
import { FaImage } from "react-icons/fa";
import { useUpdateProperty } from "~/hooks/useProperties";

interface Prop {
  property: Property;
}

export const EditProperty = ({ property }: Prop) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useClickOutside({ isOpen, setIsOpen });

  const [formData, setFormData] = useState<Property>(property);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const { mutate: updateProperty, isPending } = useUpdateProperty();

  useEffect(() => {
    if (isOpen) {
      setFormData(property);
      setExistingImages(property.imageUrls || []);
      setNewImages([]);
    }
  }, [isOpen]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setNewImages((prev) => [...prev, ...Array.from(files)]);
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const form = new FormData();

  form.append("title", formData.title);
  form.append("type", formData.type);
  form.append("listingType", formData.listingType);
  form.append("price", String(formData.price));
  form.append("duration", formData.duration || "");
  form.append("country", formData.country);
  form.append("state", formData.state);
  form.append("city", formData.city);
  form.append("description", formData.description);
  form.append("isAvailable", "true");
  form.append("existingImages", JSON.stringify(existingImages));

  newImages.forEach((file) => {
    form.append("images", file);
  });

  updateProperty(
    {
      id: formData.id!,
      data: form,
    },
    {
      onSuccess: () => setIsOpen(false),
    }
  );
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
      <button
        onClick={() => setIsOpen(true)}
        className="block w-full px-4 py-2 text-left text-sm rounded-lg hover:bg-gray-100"
      >
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-lg w-[95%] md:w-[700px] p-6 max-h-[90vh] overflow-y-auto scrollbar-hidden"
          >
            <div className="flex justify-between mb-6">
              <p className="font-bold text-lg text-purple-600">
                Update Property
              </p>
              <button onClick={() => setIsOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}{" "}
              <div className="col-span-2">
                {" "}
                <label className="text-sm text-gray-600">Title*</label>{" "}
                <input
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  type="text"
                  placeholder="Title"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />{" "}
              </div>{" "}
              {/* Type + Listing + Price + Duration */}{" "}
              <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                {" "}
                <div>
                  {" "}
                  <label className="text-sm text-gray-600">
                    {" "}
                    Property type*{" "}
                  </label>{" "}
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
                    {" "}
                    <option>Type</option>{" "}
                    <option value="apartment">Apartment</option>{" "}
                    <option value="building">Building</option>{" "}
                    <option value="land">Land</option>{" "}
                  </select>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label className="text-sm text-gray-600">
                    {" "}
                    Listing Type*{" "}
                  </label>{" "}
                  <select
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.listingType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        listingType: e.target.value as Property["listingType"],
                      })
                    }
                  >
                    {" "}
                    <option>Select Type</option>{" "}
                    <option value="rental">Rental</option>{" "}
                    <option value="sale">Sale</option>{" "}
                  </select>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label className="text-sm text-gray-600">Price*</label>{" "}
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
                  />{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label className="text-sm text-gray-600">
                    {" "}
                    Duration (only for rental){" "}
                  </label>{" "}
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.duration}
                    disabled={formData.listingType !== "rental"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration: e.target.value as Property["duration"],
                      })
                    }
                  >
                    {" "}
                    <option>Duration</option>{" "}
                    <option value="daily">Daily</option>{" "}
                    <option value="weekly">Weekly</option>{" "}
                    <option value="monthly">Monthly</option>{" "}
                    <option value="yearly">Yearly</option>{" "}
                  </select>{" "}
                </div>{" "}
              </div>{" "}
              {/* Location */}{" "}
              <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {" "}
                <div>
                  {" "}
                  <label className="text-sm text-gray-600">State*</label>{" "}
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
                    {" "}
                    <option>State</option>{" "}
                    {states.map((state, index) => (
                      <option key={index} value={state}>
                        {" "}
                        {state}{" "}
                      </option>
                    ))}{" "}
                  </select>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label className="text-sm text-gray-600">City*</label>{" "}
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  >
                    {" "}
                    <option>City</option>{" "}
                    {cities.map((city: string, index: number) => (
                      <option key={index} value={city}>
                        {" "}
                        {city}{" "}
                      </option>
                    ))}{" "}
                  </select>{" "}
                </div>{" "}
              </div>{" "}
              {/* Description */}{" "}
              <div className="col-span-2 py-2">
                {" "}
                <label className="text-sm text-gray-600">
                  Description*
                </label>{" "}
                <textarea
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />{" "}
              </div>
              {/* Image Upload */}
              <div
                onClick={() => fileRef.current?.click()}
                className="flex gap-2 items-center cursor-pointer"
              >
                <FaImage />
                <span>Upload photos</span>
                <input
                  hidden
                  type="file"
                  multiple
                  ref={fileRef}
                  onChange={handleImageUpload}
                />
              </div>
              {/* Existing Images */}
              <div className="flex flex-wrap gap-3">
                {existingImages.map((img, i) => (
                  <div key={i} className="relative">
                    <img src={img} className="w-24 h-24 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(i)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                {/* New Images Preview */}
                {newImages.map((file, i) => (
                  <div key={i} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(i)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              {/* Submit */}
              <button
                disabled={isPending}
                className="bg-purple-600 text-white px-4 py-2 w-full rounded disabled:opacity-50"
              >
                {isPending ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
