export const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

