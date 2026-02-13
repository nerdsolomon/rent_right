import { useState } from "react";
import { FaCopy, FaQrcode } from "react-icons/fa";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";
import { useQrCode } from "~/hooks/useQrCode";

export const Qrcode = () => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  const { currentUser } = useData();
  const profileUrl = `${window.location.origin}/portfolio/${currentUser.id}`;
  const qrCode = useQrCode(profileUrl);
  return (
    <>
      <div
        className="flex items-center gap-5 text-gray-400 hover:text-gray-600 cursor-pointer"
        onClick={() => onClose(true)}
      >
        <FaQrcode size={18} />
        <p>Share portfolio</p>
      </div>

      {isOpen && (
        <div className="fixed absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-lg w-[80%] md:w-[400px] p-6 items-center animate-fadeIn"
          >
            <img src={qrCode || ""} className="w-full h-full object-contain" />
            <div
              onClick={async () =>
                await navigator.clipboard.writeText(profileUrl)
              }
              className="mt-4 bg-gray-100 rounded-md px-3 py-2 flex justify-between items-center text-xs w-full"
            >
              <span className="truncate">{profileUrl}</span>
              <FaCopy className="text-gray-500" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
