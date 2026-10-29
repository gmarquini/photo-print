import { api } from "../services/api";

export async function cancelSession(sessionId: string) {
  const areYouSure = confirm("Essa sessão será cancelada. Deseja fazer isso?");

  if (!areYouSure) {
    return;
  }
  return api.patch(`session/${sessionId}/cancel`);
}
