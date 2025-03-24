const app = require('./app');
const port = 3001;

const server = app.listen(port, () => {
  console.log(`Organizations Service running on http://localhost:${port}`);
});

module.exports = server;

