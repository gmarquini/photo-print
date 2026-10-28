export function formatDate(date: string) {
  //2026-10-28T13:37:33.460Z
  const actualDate = new Date(date);

  const day = String(actualDate.getDate());
  const month = String(actualDate.getMonth() + 1);
  const year = String(actualDate.getFullYear());
  const hour = String(actualDate.getHours());
  const minutes = String(actualDate.getMinutes());

  return {
    date: `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`,
    hour: `${hour.padStart(2, "0")}:${minutes.padStart(2, "0")}`,
  };
}
