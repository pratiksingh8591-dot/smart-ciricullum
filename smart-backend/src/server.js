import app from "./app.js";

const BASE_PORT = Number(process.env.PORT) || 4000;
const MAX_TRIES = 5;

// Retry a few nearby ports if the preferred one is busy.
function startServer(port, attempt = 1) {
  const server = app.listen(port, () => {
    console.log(`Smart Curriculum backend running on http://localhost:${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE" && attempt < MAX_TRIES) {
      const nextPort = port + 1;
      console.warn(`Port ${port} in use, retrying on ${nextPort} (attempt ${attempt + 1}/${MAX_TRIES})...`);
      setTimeout(() => startServer(nextPort, attempt + 1), 100);
      return;
    }

    console.error(`Failed to start server on port ${port}:`, err.message);
    process.exit(1);
  });
}

startServer(BASE_PORT);
