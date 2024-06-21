export const fetchPodcasts = async () => {
  try {
    const response = await fetch("https://podcast-api.netlify.app");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching podcasts:", error);
    throw error;
  }
};

export const fetchShowDetails = async (id) => {
  try {
    const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching show details for id ${id}:`, error);
    throw error;
  }
};

export const fetchGenreDetails = async (id) => {
  try {
    const response = await fetch(`https://podcast-api.netlify.app/genre/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching genre details for id ${id}:`, error);
    throw error;
  }
};
