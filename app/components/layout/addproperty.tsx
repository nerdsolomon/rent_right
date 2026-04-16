import { useRef, useState } from "react";
import { FaImage, FaPlus } from "react-icons/fa";
import useClickOutside from "~/hooks/useClickOutside";
import { emptyProperty, type Property } from "~/types";
import { location } from "~/services";
import { useCreateProperty } from "~/hooks/useProperties";
import { useMe } from "~/hooks/useAuth";

export const AddProperty = () => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  const { data, isLoading } = useMe();
  const currentUser = data?.user
  const { mutate: register, isPending, isSuccess, error } = useCreateProperty()

  const [formData, setFormData] = useState<Property>({
    ...emptyProperty,
    country: "Nigeria",
  });

  const [prevImages, setPrevImages] = useState<string[]>([]);
  const prevImageRef = useRef<HTMLInputElement | null>(null);

  const states = formData.country
    ? Object.keys(location[formData.country] || {})
    : [];

  const cities =
    formData.country && formData.state
      ? location[formData.country]?.[formData.state] || []
      : [];

  const addProperty = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (prevImages.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    if (formData.listingType === "rental" && !formData.duration) {
      alert("Please select duration for rental");
      return;
    }

      register({
        id: Date.now(),
        country: formData.country,
        state: formData.state,
        city: formData.city,
        title: formData.title,
        price: formData.price,
        description: formData.description,
        imageUrls: prevImages,
        type: formData.type,
        listingType: formData.listingType,
        duration: formData.duration,
        isAvailable: true,
        owner: currentUser
      })

    setFormData({ ...emptyProperty, country: "Nigeria" });
    setPrevImages([]);
    onClose(false);
  };

  const removeImage = (index: number) => {
    setPrevImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {currentUser?.role === "owner" && (
        <button
          onClick={() => onClose(true)}
          className="fixed bottom-8 right-8 border-4 border-white bg-purple-600 text-white hover:bg-purple-800 px-4 py-4 lg:px-6 lg:py-3 rounded-full shadow-lg flex items-center g p-1 transition"
        >
          <FaPlus className="text-md" />
          <span className="hidden lg:inline font-medium">Add Property</span>
        </button>
      )}

      {isOpen && (
        <div className="fixed absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-lg w-[95%] md:w-[700px] p-6 animate-fadeIn max-h-[90vh] overflow-y-auto scrollbar-hidden"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="font-bold text-lg text-purple-600">
                  Upload Property
                </p>
                <p className="text-xs text-gray-400">
                  Upload your property details
                </p>
              </div>

              <button
                onClick={() => onClose(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <form onSubmit={addProperty}>
                <div className="col-span-2">
                  <label className="text-sm text-gray-600">Title*</label>
                  <input
                    className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    type="text"
                    placeholder="Title"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                  <div>
                    <label className="text-sm text-gray-600">
                      Property type*
                    </label>
                    <select
                      className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          type: e.target.value as Property["type"],
                        })
                      }
                    >
                      <option value="">Type</option>
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
                      className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={formData.listingType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          listingType: e.target
                            .value as Property["listingType"],
                        })
                      }
                    >
                      <option value="">Select Type</option>
                      <option value="rental">Rental</option>
                      <option value="sale">Sale</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Price*</label>
                    <input
                      className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      type="number"
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
                      className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          duration: e.target.value as Property["duration"],
                        })
                      }
                    >
                      <option value="">Duration</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">State*</label>
                    <select
                      className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                      <option value="">State</option>
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
                      className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                    >
                      <option value="">City</option>
                      {cities.map((city: string, index: number) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-2 py-2">
                  <label className="text-sm text-gray-600">Description*</label>
                  <textarea
                    required
                    className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div
                  onClick={() => prevImageRef.current?.click()}
                  className="flex gap-2 items-center cursor-pointer pb-3 rounded-lg"
                >
                  <FaImage className="text-xl text-purple-600" />
                  <span className="hover:text-purple-600">Upload photos *</span>
                  <input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    multiple
                    ref={prevImageRef}
                    onChange={(e) => {
                      const files = e.target.files;
                      if (!files) return;

                      const fileArray = Array.from(files);

                      Promise.all(
                        fileArray.map(
                          (file) =>
                            new Promise<string>((resolve, reject) => {
                              const reader = new FileReader();
                              reader.onload = () =>
                                resolve(reader.result as string);
                              reader.onerror = reject;
                              reader.readAsDataURL(file);
                            }),
                        ),
                      ).then((images) =>
                        setPrevImages((prev) => [...prev, ...images]),
                      );
                    }}
                  />
                </div>

                {prevImages.length > 0 && (
                  <div className="flex flex-wrap gap-3 py-4">
                    {prevImages.map((image, index) => (
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

                <div className="col-span-2">
                  <button
                    className="bg-purple-600 px-4 py-2 text-white w-full hover:bg-purple-800 rounded-lg disabled:opacity-50"
                    type="submit"
                    disabled={prevImages.length === 0}
                  >
                    Upload
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
