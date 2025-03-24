const app = require('./app');
const port = 3002;

const server = app.listen(port, () => {
  console.log(`Events Service running on http://localhost:${port}`);
});

module.exports = server;