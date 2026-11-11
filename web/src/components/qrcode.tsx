import { QRCodeSVG } from "qrcode.react";

export function QrCode(sessionId: string) {
  const uploadUrl = `${import.meta.env.VITE_API_URL}/sessions/${sessionId}/mobileUploadPage`;

  return <QRCodeSVG value={uploadUrl} />;
}
