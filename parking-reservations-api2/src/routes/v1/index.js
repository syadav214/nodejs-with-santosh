const { setConnection } = require("../../dbOps/connection");
const {
  getAvailableSlots,
  getOccupiedSlots,
  registerParkingSlot,
  occupyParkingSlot,
  leaveParkingSlot,
} = require("../../services/parking-slots-service");
const { getUsers } = require("../../services/users-service");

module.exports = function (fastify, opts, next) {
  setConnection(fastify.mongo);

  fastify.get("/health", function (request, reply) {
    reply.send({ status: "healthy" });
  });

  fastify.put("/parking-slots/register/:userId", function (request, reply) {
    registerParkingSlot(request.params.userId)
      .then((data) => reply.send(data))
      .catch((err) => reply.code(501).send(err));
  });

  fastify.put("/parking-slots/occupy/:userId", function (request, reply) {
    occupyParkingSlot(request.params.userId)
      .then((data) => reply.send(data))
      .catch((err) => reply.code(501).send(err));
  });

  fastify.put("/parking-slots/leave/:userId", function (request, reply) {
    leaveParkingSlot(request.params.userId)
      .then((data) => reply.send(data))
      .catch((err) => reply.code(501).send(err));
  });

  fastify.get("/parking-slots/available", function (request, reply) {
    getAvailableSlots()
      .then((data) => reply.send(data))
      .catch((err) => reply.code(501).send(err));
  });

  fastify.get("/parking-slots/occupied", function (request, reply) {
    getOccupiedSlots()
      .then((data) => reply.send(data))
      .catch((err) => reply.code(501).send(err));
  });

  fastify.get("/users", function (request, reply) {
    getUsers()
      .then((data) => reply.send(data))
      .catch((err) => reply.code(501).send(err));
  });

  next();
};
