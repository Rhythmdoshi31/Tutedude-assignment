// Fetching progress from the API endpoint...

export const fetchProgress = async (userId) => {
    try {
      const response = await fetch(`https://videoprogresslogger.onrender.com/api/progress/${userId}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.error("Failed to load progress");
        return [];
      }
    } catch (err) {
      console.error("Error fetching progress:", err);
      return [];
    }
  };
  