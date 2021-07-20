const fastify = require("fastify")({
  logger: true,
});
const config = require("config");

fastify.register(require("fastify-cors"), {
  // allowing only localhost client to make request
  origin: "http://localhost:3000",
});

fastify.register(require("fastify-mongodb"), {
  url: config.get("MONGO_DB_CONN"),
});

fastify.register(require("./routes/v1"), { prefix: "/v1" });

// Run the server!
fastify.listen(config.get("PORT"), function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
