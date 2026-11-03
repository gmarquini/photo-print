import { api } from "../services/api";

export async function cancelSession(
  sessionId: string,
  message: string,
): Promise<boolean> {
  const areYouSure = confirm(`${message}`);

  if (!areYouSure) {
    return false;
  }
  api.patch(`/sessions/${sessionId}/cancel`);
  return true;
}
