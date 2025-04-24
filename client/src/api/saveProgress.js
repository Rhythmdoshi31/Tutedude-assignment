export const saveProgress = async (data) => {
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (err) {
      console.error('Failed to save progress:', err);
    }
  };
  