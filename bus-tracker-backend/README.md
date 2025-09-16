# Bus Tracker Backend

Backend for real-time bus tracking MVP.

## Setup

1.  Clone the repository:
    ```bash
    git clone <your-repo-url>
    cd bus-tracker-backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file from the example and update your database credentials:
    ```bash
    cp .env.example .env
    ```

4.  Run the database migration:
    ```bash
    mysql -u root -p < migrations/init.sql
    ```

5.  Start the development server:
    ```bash
    npm run dev
    ```

## API Usage

### Update bus location

```bash
curl -X POST http://localhost:3000/driver/update-location -H "Content-Type: application/json" -H "x-api-key: some-secret-key-for-drivers" -d '{"busId": "BUS101", "lat": 34.0522, "lng": -118.2437}'
```

### Get all buses

```bash
curl http://localhost:3000/public/all-buses
```

### Get all buses updated in the last 60 seconds

```bash
curl http://localhost:3000/public/all-buses?recentSec=60
```

### Get bus by ID

```bash
curl http://localhost:3000/public/bus/BUS101
```

## Frontend Integration

Poll the API every 5 seconds to get the latest bus locations.

```javascript
async function fetchAll() {
  const res = await fetch("http://localhost:3000/public/all-buses");
  return await res.json();
}

setInterval(async () => {
  const buses = await fetchAll();
  console.log(buses);
}, 5000);
```

## Testing with Simulation

To test the backend, you can run the simulation script which sends fake GPS updates every 5 seconds.

```bash
node tools/simulate-bus.js
```

## Future Improvements

-   **WebSockets**: For real-time communication instead of polling.
-   **Redis**: For caching bus locations to reduce database load.
-   **ETA Calculation**: Implement logic to calculate estimated time of arrival for buses.
