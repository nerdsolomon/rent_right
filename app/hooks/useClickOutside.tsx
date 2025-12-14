import { useEffect, useRef } from "react";

interface Prop {
  isOpen: boolean;
  onClose: (value: boolean) => void;
}

const useClickOutside = ({ isOpen, onClose }: Prop) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) onClose(false);
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return modalRef;
};

export default useClickOutside;
