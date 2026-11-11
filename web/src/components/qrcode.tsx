import { QRCodeSVG } from "qrcode.react";

export function QrCode(sessionId: string) {
  const uploadUrl = `${import.meta.env.FRONTEND_URL}/sessions/${sessionId}/mobileUploadPage`;

  return <QRCodeSVG value={uploadUrl} />;
}
