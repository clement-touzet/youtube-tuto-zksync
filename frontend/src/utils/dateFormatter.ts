export default function formatToReadableDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}
