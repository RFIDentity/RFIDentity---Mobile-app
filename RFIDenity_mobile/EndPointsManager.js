export const getAreas = async () => {
  let result = null
  try {
    const response = await fetch('http://192.168.0.192:4000/api/getAssetsLocations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    result = await response.json()

  } catch (err) {
    console.error('Fetch error:', err);
  }
  return result.areas
};