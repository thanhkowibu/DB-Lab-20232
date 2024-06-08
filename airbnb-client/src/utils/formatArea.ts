export const formatArea = (area: string) => {
  const formattedArea = area.replace(/_/g, " ");
  const words = formattedArea.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  return words.join(" ");
};
