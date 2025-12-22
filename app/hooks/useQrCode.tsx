import { useMemo } from "react";

export const useQrCode = (profileUrl : string, size = "200x200") => {
  const qrCodeUrl = useMemo(() => {
    if (!profileUrl) return null;
    return `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
      profileUrl
    )}&size=${size}`;
  }, [profileUrl, size]);

  return qrCodeUrl;
};
