import { QRCodeSVG } from "qrcode.react";

export function QrCode(sessionId: string) {
  const uploadUrl = `${import.meta.env.FONTEND_URL}/sessions/${sessionId}/mobileUploadPage`;

  return <QRCodeSVG value={uploadUrl} />;
}
