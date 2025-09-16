import { Router } from 'express';
import { validateLocationPayload } from '../utils/validate.js';

const router = Router();

// Simple in-memory store for buses to avoid DB setup in dev
const busStore = new Map();

// Basic route centers for ETA demo
const routeCenters = new Map([
  ['A-703', { lat: 19.076, lng: 72.877 }],
  ['22',   { lat: 19.08,  lng: 72.87  }],
  ['A-37', { lat: 19.07,  lng: 72.872 }],
  ['71',   { lat: 19.072, lng: 72.88  }],
  ['11',   { lat: 19.09,  lng: 72.86  }],
  ['15',   { lat: 19.1,   lng: 72.88  }],
  ['501',  { lat: 19.06,  lng: 72.89  }],
  ['66',   { lat: 19.085, lng: 72.87  }],
]);

function haversineKm(a, b) {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const lat1 = a.lat * Math.PI / 180;
  const lat2 = b.lat * Math.PI / 180;
  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);
  const c = 2 * Math.asin(Math.sqrt(sinDLat*sinDLat + Math.cos(lat1)*Math.cos(lat2)*sinDLng*sinDLng));
  return R * c;
}

function computeEtaString(row) {
  const center = routeCenters.get(String(row.route_id));
  if (!center) return 'N/A';
  const distanceKm = haversineKm({ lat: row.last_lat, lng: row.last_lng }, center);
  const speed = row.speed_kmph && row.speed_kmph > 1 ? row.speed_kmph : 18; // assume 18 km/h if not moving
  const minutes = Math.round((distanceKm / speed) * 60);
  if (!Number.isFinite(minutes)) return 'N/A';
  if (minutes <= 1) return 'Arriving';
  if (minutes < 5) return `${minutes} min`;
  return `${minutes} mins`;
}

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
  const withEta = rows.map(r => ({ ...r, eta: computeEtaString(r) }));
  res.json(withEta);
});

router.get('/public/bus/:busId', async (req, res) => {
  const row = busStore.get(String(req.params.busId));
  if (!row) {
    return res.status(404).json({ error: 'Bus not found' });
  }
  res.json({ ...row, eta: computeEtaString(row) });
});

// Dev-only: seed sample buses (expanded)
router.post('/dev/seed', (req, res) => {
  const samples = [
    { bus_id: '703', route_id: 'A-703', last_lat: 19.0896, last_lng: 72.8656, speed_kmph: 30, heading_deg: 90 },
    { bus_id: '22',  route_id: '22',   last_lat: 19.0812, last_lng: 72.8691, speed_kmph: 24, heading_deg: 45 },
    { bus_id: 'A-37',route_id: 'A-37', last_lat: 19.0750, last_lng: 72.8722, speed_kmph:  0, heading_deg: 0  },
    { bus_id: '71',  route_id: '71',   last_lat: 19.0722, last_lng: 72.8801, speed_kmph: 18, heading_deg: 270 },
    { bus_id: '11',  route_id: '11',   last_lat: 19.0920, last_lng: 72.8610, speed_kmph: 20, heading_deg: 180 },
    { bus_id: '15',  route_id: '15',   last_lat: 19.1010, last_lng: 72.8830, speed_kmph: 26, heading_deg: 210 },
    { bus_id: '501', route_id: '501',  last_lat: 19.0610, last_lng: 72.8910, speed_kmph: 22, heading_deg: 120 },
    { bus_id: '66',  route_id: '66',   last_lat: 19.0860, last_lng: 72.8710, speed_kmph: 16, heading_deg: 60  },
  ];
  const now = new Date().toISOString();
  samples.forEach((s) => {
    busStore.set(s.bus_id, { ...s, updated_at: now });
  });
  res.json({ status: 'seeded', count: samples.length });
});

// Convenience GET for seeding via browser
router.get('/dev/seed', (req, res) => {
  const now = new Date().toISOString();
  // Reuse existing samples from POST handler for consistency
  const samples = Array.from([
    { bus_id: '703', route_id: 'A-703', last_lat: 19.0896, last_lng: 72.8656, speed_kmph: 30, heading_deg: 90 },
    { bus_id: '22',  route_id: '22',   last_lat: 19.0812, last_lng: 72.8691, speed_kmph: 24, heading_deg: 45 },
    { bus_id: 'A-37',route_id: 'A-37', last_lat: 19.0750, last_lng: 72.8722, speed_kmph:  0, heading_deg: 0  },
    { bus_id: '71',  route_id: '71',   last_lat: 19.0722, last_lng: 72.8801, speed_kmph: 18, heading_deg: 270 },
    { bus_id: '11',  route_id: '11',   last_lat: 19.0920, last_lng: 72.8610, speed_kmph: 20, heading_deg: 180 },
    { bus_id: '15',  route_id: '15',   last_lat: 19.1010, last_lng: 72.8830, speed_kmph: 26, heading_deg: 210 },
    { bus_id: '501', route_id: '501',  last_lat: 19.0610, last_lng: 72.8910, speed_kmph: 22, heading_deg: 120 },
    { bus_id: '66',  route_id: '66',   last_lat: 19.0860, last_lng: 72.8710, speed_kmph: 16, heading_deg: 60  },
  ]);
  samples.forEach((s) => {
    busStore.set(s.bus_id, { ...s, updated_at: now });
  });
  res.json({ status: 'seeded', count: samples.length, method: 'GET' });
});

export default router;
