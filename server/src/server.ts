// server.ts

import app from "./app";

const port = app.get("port");

if (require.main === module) {
  // This means the file is being run directly and not imported
  const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  // You can export the server here if needed
  module.exports = server;
}

export default app;
