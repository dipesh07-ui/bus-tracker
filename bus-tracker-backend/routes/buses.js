import { Router } from 'express';
import { validateLocationPayload } from '../utils/validate.js';

const router = Router();

// Simple in-memory store for buses to avoid DB setup in dev
const busStore = new Map();

// Middleware to check for API key (optional in dev if not set)
const checkApiKey = (req, res, next) => {
  const requiredKey = process.env.API_KEY;
  if (!requiredKey) {
    return next();
  }
  const apiKey = req.get('x-api-key');
  if (!apiKey || apiKey !== requiredKey) {
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

  // Update in-memory store
  const record = {
    bus_id: String(busId),
    route_id: String(routeId),
    last_lat: Number(lat),
    last_lng: Number(lng),
    speed_kmph: speed != null ? Number(speed) : null,
    heading_deg: heading != null ? Number(heading) : null,
    updated_at: new Date().toISOString(),
  };
  busStore.set(String(busId), record);
  res.json({ status: 'ok' });
});

router.get('/public/all-buses', async (req, res) => {
  const { recentSec } = req.query;
  const now = Date.now();
  let rows = Array.from(busStore.values());
  if (recentSec) {
    const windowMs = parseInt(recentSec, 10) * 1000;
    rows = rows.filter((r) => now - Date.parse(r.updated_at) <= windowMs);
  }
  res.json(rows);
});

router.get('/public/bus/:busId', async (req, res) => {
  const row = busStore.get(String(req.params.busId));
  if (!row) {
    return res.status(404).json({ error: 'Bus not found' });
  }
  res.json(row);
});

// Dev-only: seed sample buses
router.post('/dev/seed', (req, res) => {
  const samples = [
    { bus_id: '703', route_id: 'A-703', last_lat: 19.0896, last_lng: 72.8656, speed_kmph: 30, heading_deg: 90 },
    { bus_id: '22', route_id: '22', last_lat: 19.0812, last_lng: 72.8691, speed_kmph: 24, heading_deg: 45 },
    { bus_id: 'A-37', route_id: 'A-37', last_lat: 19.0750, last_lng: 72.8722, speed_kmph: 0, heading_deg: 0 },
    { bus_id: '71', route_id: '71', last_lat: 19.0722, last_lng: 72.8801, speed_kmph: 18, heading_deg: 270 },
  ];
  const now = new Date().toISOString();
  samples.forEach((s) => {
    busStore.set(s.bus_id, { ...s, updated_at: now });
  });
  res.json({ status: 'seeded', count: samples.length });
});

export default router;
