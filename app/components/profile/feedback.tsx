import { useEffect, useRef, useState } from "react";
import { FaBug, FaImage } from "react-icons/fa";
import { useMe } from "~/hooks/useAuth";
import useClickOutside from "~/hooks/useClickOutside";
import { useCreateFeedback } from "~/hooks/useFeedbacks";
import { emptyFeedback } from "~/types";

export const Feedback = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useClickOutside({ isOpen, setIsOpen });

  const { data } = useMe();
  const currentUser = data.user;

  const { mutate: createFeedback } = useCreateFeedback();
  const [formData, setFormData] = useState(emptyFeedback);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const sendFeedback = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser?.id) return;
    const fd = new FormData();
    fd.append("text", formData.text);
    fd.append("isViewed", "false");
    fd.append("userId", String(currentUser.id));

    files.forEach((file) => {
      fd.append("imageUrls", file);
    });

    createFeedback(fd);
    setFormData(emptyFeedback);
    setFiles([]);
    setPreviews([]);
    setIsOpen(false);
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
    <div>
      <div
        className="flex items-center gap-5 text-gray-400 hover:text-gray-600 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <FaBug size={18} />
        <p>Send feedback</p>
      </div>

      {isOpen && (
        <div className="fixed absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-gray-100 rounded-2xl shadow-lg w-[90%] md:w-[400px] p-4 animate-fadeIn"
          >
            <div className="flex justify-between mb-6">
              <div>
                <p className="font-semibold">Send feedback</p>
                <p className="text-gray-400 text-xs">
                  Report any technical issue
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form className="space-y-2" onSubmit={sendFeedback}>
              <textarea
                required
                rows={3}
                className="w-full p-2 border border-gray-300 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Describe the technical issue"
                value={formData.text}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    text: e.target.value,
                  })
                }
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

              <button
                type="submit"
                className="bg-purple-600 w-full hover:bg-purple-800 text-white font-bold py-2 text-sm rounded-lg"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
