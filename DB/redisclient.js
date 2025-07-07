// redisClient.js
const { createClient } = require('redis');

const redisClient = createClient(); // defaults to localhost:6379

redisClient.on('error', (err) => {
  console.error('❌ Redis Error:', err);
});

redisClient.connect()
  .then(() => console.log('✅ Redis Connected'))
  .catch((err) => console.error('Redis Connection Error:', err));

module.exports = redisClient;
