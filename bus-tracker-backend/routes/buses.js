import { Router } from 'express';
import pool from '../db.js';
import { validateLocationPayload } from '../utils/validate.js';

const router = Router();

// Middleware to check for API key
const checkApiKey = (req, res, next) => {
  const apiKey = req.get('x-api-key');
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

router.post('/driver/update-location', checkApiKey, async (req, res) => {
  const validation = validateLocationPayload(req.body);
  if (!validation.ok) {
    return res.status(400).json({ error: validation.msg });
  }

  const { busId, routeId, lat, lng, speed, heading } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO buses (bus_id, route_id, last_lat, last_lng, speed_kmph, heading_deg) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE route_id = VALUES(route_id), last_lat = VALUES(last_lat), last_lng = VALUES(last_lng), speed_kmph = VALUES(speed_kmph), heading_deg = VALUES(heading_deg)',
      [busId, routeId, lat, lng, speed, heading]
    );
    res.json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

router.get('/public/all-buses', async (req, res) => {
  const { recentSec } = req.query;
  try {
    let query = 'SELECT * FROM buses';
    const params = [];
    if (recentSec) {
      query += ' WHERE updated_at >= NOW() - INTERVAL ? SECOND';
      params.push(parseInt(recentSec, 10));
    }
    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

router.get('/public/bus/:busId', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM buses WHERE bus_id = ?', [req.params.busId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
