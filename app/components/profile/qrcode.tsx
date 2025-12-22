import { useState } from "react";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";
import { useQrCode } from "~/hooks/useQRCode";

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
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-lg w-[300px] p-3 items-center animate-fadeIn"
          >
            <img src={qrCode || ""} className="w-full h-full object-contain" />
          </div>
        </div>
      )}
    </>
  );
};
