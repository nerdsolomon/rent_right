import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";
import { useQrCode } from "~/hooks/useQrCode";

export const Qrcode = () => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  const { currentUser } = useData();
  const profileUrl = `${window.location.origin}/profile/${currentUser.id}`;
  const qrCode = useQrCode(profileUrl);
  return (
    <>
      <button
        onClick={() => onClose(true)}
        className="p-2 bg-green-400 mt-2 text-xs hover:bg-green-500 text-white rounded-lg font-semibold"
      >
        Share
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center px-2">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-lg w-[80%] md:w-[400px] p-6 items-center animate-fadeIn"
          >
            <img src={qrCode || ""} className="w-full h-full object-contain" />
            <div className="mt-4 bg-gray-100 rounded-md px-3 py-2 flex justify-between items-center text-xs w-full">
              <span className="truncate">{profileUrl}</span>
              <FaCopy onClick={async () => await navigator.clipboard.writeText(profileUrl)} className="text-gray-500" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
