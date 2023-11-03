import app from "./app";

const port = app.get("port");

if (require.main === module) {
  const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  module.exports = server;
}

export default app;
