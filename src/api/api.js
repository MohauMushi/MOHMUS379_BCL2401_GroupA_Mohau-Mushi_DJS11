export const fetchPodcasts = async () => {
  const response = await fetch("https://podcast-api.netlify.app");
  const data = await response.json();
  return data;
};

export const fetchShowDetails = async (id) => {
  const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
  const data = await response.json();
  return data;
};

export const fetchGenreDetails = async (id) => {
  const response = await fetch(`https://podcast-api.netlify.app/genre/${id}`);
  const data = await response.json();
  return data;
};
