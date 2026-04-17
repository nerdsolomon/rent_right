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

  const { data } = useMe();
  const currentUser = data?.user;

  const { mutate: register, error } = useCreateProperty();

  const [formData, setFormData] = useState<Property>({
    ...emptyProperty,
    country: "Nigeria",
  });

  // ✅ store actual files
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
    form.append("owner", JSON.stringify(currentUser)); // depends on backend

    // ✅ append multiple files
    files.forEach((file) => {
      form.append("images", file);
    });

    register(form);

    setFormData({ ...emptyProperty, country: "Nigeria" });
    setFiles([]);
    setPreviews([]);
    onClose(false);
  };

  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {currentUser?.role === "owner" && (
        <button
          onClick={() => onClose(true)}
          className="fixed bottom-8 right-8 border-4 border-white bg-purple-600 text-white hover:bg-purple-800 px-4 py-4 lg:px-6 lg:py-3 rounded-full shadow-lg flex items-center p-1 transition"
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
            <form onSubmit={addProperty} className="space-y-4">
              {/* inputs unchanged... */}

              <div
                onClick={() => fileRef.current?.click()}
                className="flex gap-2 items-center cursor-pointer pb-3"
              >
                <FaImage className="text-purple-600" />
                <span>Upload photos *</span>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileRef}
                  className="hidden"
                  onChange={(e) => {
                    const selected = e.target.files;
                    if (!selected) return;

                    const fileArray = Array.from(selected);

                    setFiles((prev) => [...prev, ...fileArray]);

                    const previewUrls = fileArray.map((file) =>
                      URL.createObjectURL(file)
                    );

                    setPreviews((prev) => [...prev, ...previewUrls]);
                  }}
                />
              </div>

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

              <button
                type="submit"
                disabled={files.length === 0}
                className="bg-purple-600 text-white w-full py-2 rounded-lg"
              >
                Upload
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