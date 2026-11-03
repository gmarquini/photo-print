import { QRCodeSVG } from "qrcode.react";

export function QrCode(sessionId: string) {
  const uploadUrl = `http://192.168.200.197:5173/sessions/${sessionId}/mobileUploadPage`;

  return <QRCodeSVG value={uploadUrl} />;
}
