import axios from 'axios';

export const dismissTutorial = async () => {
  const token = JSON.parse(localStorage.getItem('user'))?.token;

  if (!token) return;

  try {
    await axios.put(
      '/api/tutorial',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
  console.error("Error dismissing tutorial:", error.response?.data || error.message);
}

};
