export function validateLocationPayload(obj) {
  if (!obj || typeof obj !== 'object') {
    return { ok: false, msg: 'Invalid payload' };
  }

  const { busId, lat, lng } = obj;

  if (typeof busId !== 'string' || busId.trim() === '') {
    return { ok: false, msg: 'busId is required and must be a non-empty string.' };
  }

  if (typeof lat !== 'number' || lat < -90 || lat > 90) {
    return { ok: false, msg: 'lat is required and must be a number between -90 and 90.' };
  }

  if (typeof lng !== 'number' || lng < -180 || lng > 180) {
    return { ok: false, msg: 'lng is required and must be a number between -180 and 180.' };
  }

  return { ok: true };
}
