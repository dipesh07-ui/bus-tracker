import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const API_KEY = process.env.API_KEY;
const API_URL = 'http://localhost:3000/driver/update-location';

const busId = 'BUS100';
let lat = 28.7041;
let lng = 77.1025;

async function sendLocationUpdate() {
  lat += (Math.random() - 0.5) * 0.01;
  lng += (Math.random() - 0.5) * 0.01;

  const payload = {
    busId,
    routeId: 'R1',
    lat,
    lng,
    speed: Math.random() * 60,
    heading: Math.random() * 360,
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Update sent:', payload, 'Response:', data);
  } catch (error) {
    console.error('Error sending update:', error.message);
  }
}

setInterval(sendLocationUpdate, 5000);
