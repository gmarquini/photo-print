import { QRCodeSVG } from "qrcode.react";

export function QrCode(sessionId: string) {
  const uploadUrl = `${window.location.origin}/sessions/${sessionId}/mobileUploadPage`;
  return <QRCodeSVG value={uploadUrl} />;
}
