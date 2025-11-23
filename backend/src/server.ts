import { createApp } from "./app";
import dotenv from "dotenv";
import { initDB } from "./config/initDB";

dotenv.config();
const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await initDB(); // Run DB initialization before starting the server
    const app = createApp();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
})();
