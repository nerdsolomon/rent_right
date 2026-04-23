import { useEffect, useRef, useState } from "react";
import { FaImage, FaPlus } from "react-icons/fa";
import useClickOutside from "~/hooks/useClickOutside";
import { emptyProperty, type Property } from "~/types";
import { location } from "~/services";
import { useCreateProperty } from "~/hooks/useProperties";
import { useMe } from "~/hooks/useAuth";

export const AddProperty = () => {
  const [isOpen, setIsOpen] = useState(false);

  const modalRef = useClickOutside({
    isOpen,
    onClose: () => setIsOpen(false),
  });

  const { data } = useMe();
  const currentUser = data?.user;

  const { mutate: createProperty, isPending, error } = useCreateProperty();

  const [formData, setFormData] = useState<Property>({
    ...emptyProperty,
    country: "Nigeria",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const states = formData.country
    ? Object.keys(location[formData.country] || {})
    : [];

  const cities =
    formData.country && formData.state
      ? location[formData.country]?.[formData.state] || []
      : [];

  const addProperty = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (files.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    if (formData.listingType === "rental" && !formData.duration) {
      alert("Please select duration for rental");
      return;
    }

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
    form.append("ownerId", currentUser.id);

    files.forEach((file) => {
      form.append("images", file);
    });

    createProperty(form, {
      onSuccess: () => {
        setFormData({ ...emptyProperty, country: "Nigeria" });
        setFiles([]);
        previews.forEach((url) => URL.revokeObjectURL(url));
        setPreviews([]);
        setIsOpen(false);
      },
    });
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);

    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  return (
    <>
      {currentUser?.role === "owner" && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 border-4 border-white bg-purple-600 text-white hover:bg-purple-800 px-4 py-4 lg:px-6 lg:py-3 rounded-full shadow-lg flex items-center gap-2 transition"
        >
          <FaPlus />
          <span className="hidden lg:inline">Add Property</span>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-lg w-[95%] md:w-[700px] p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between mb-6">
              <div>
                <p className="font-bold text-lg text-purple-600">
                  Upload Property
                </p>
                <p className="text-xs text-gray-400">
                  Upload your personal details
                </p>
              </div>

              <button onClick={() => setIsOpen(false)}>✕</button>
            </div>
            <form onSubmit={addProperty} className="space-y-4">
              {/* Title */}
              <div>
                <label className="text-sm text-gray-600">Title*</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Type + Listing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  required
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as Property["type"],
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="building">Building</option>
                  <option value="land">Land</option>
                </select>

                <select
                  required
                  value={formData.listingType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      listingType: e.target.value as Property["listingType"],
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Listing Type</option>
                  <option value="rental">Rental</option>
                  <option value="sale">Sale</option>
                </select>
              </div>

              {/* Price + Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="number"
                  required
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: Number(e.target.value),
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <select
                  value={formData.duration}
                  disabled={formData.listingType !== "rental"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duration: e.target.value as Property["duration"],
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Duration</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  required
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      state: e.target.value,
                      city: "",
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">State</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>

                <select
                  required
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">City</option>
                  {cities.map((city: string) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <textarea
                required
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                className="w-full w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              {/* Image Upload */}
              <div
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 cursor-pointer"
              >
                <FaImage className="text-purple-600" />
                <span>Upload photos *</span>
                <input
                  ref={fileRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const selected = e.target.files;
                    if (!selected) return;

                    const fileArray = Array.from(selected);

                    setFiles((prev) => [...prev, ...fileArray]);

                    const previewUrls = fileArray.map((file) =>
                      URL.createObjectURL(file),
                    );

                    setPreviews((prev) => [...prev, ...previewUrls]);

                    e.target.value = "";
                  }}
                />
              </div>

              {/* Preview */}
              {previews.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {previews.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={files.length === 0 || isPending}
                className="bg-purple-600 text-white w-full py-2 rounded-lg"
              >
                {isPending ? "Uploading..." : "Upload"}
              </button>

              {error && (
                <p className="text-red-500 text-sm">
                  {(error as Error).message}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};
