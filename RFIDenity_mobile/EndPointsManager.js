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

export const getArea = async (location) => {
  let result = null;
  try {
    const response = await fetch('http://192.168.0.192:4000/api/readArea', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*', // Opcjonalne, w zależności od wymagań serwera
      },
      body: JSON.stringify({
        location: location,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    result = await response.json();

  } catch (err) {
    console.error('Fetch error:', err);
  }
  return result;
};

export const updateArea = async (updatedAreaData) => {
  let result = null;
  try {
    const response = await fetch('http://192.168.0.192:4000/api/updateArea', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ assets: updatedAreaData }),                
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      console.error('Network response was not ok:', response.status, errorResponse);
      throw new Error('Network response was not ok');
    }

    result = await response.json();
  } catch (err) {
    console.error('Fetch error:', err);
  }
  return result;
};                                                                                                