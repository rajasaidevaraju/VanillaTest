// Require the framework and instantiate it
const fastify = require("fastify")({ logger: false });
const path = require("path");
const startProcess = require("./services/start");
const mainRoutes = require("./routes/mainRouter");
const specialFunctionsRoutes = require("./routes/specialFunctionsRoutes");
const dbUtils = require("./utility/DBUtility");
const port = 2100;

fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "./../UI"),
});

// main route for html
fastify.get("/", async (request, reply) => {
  reply.sendFile("index.html");
});

mainRoutes.forEach((route) => {
  fastify.route(route);
});

specialFunctionsRoutes.forEach((route) => {
  fastify.route(route);
});

// Run the server!
const start = async (port) => {
  try {
    await dbUtils.ConnectWithDatabase();
    await fastify.listen(port, "0.0.0.0");
  } catch (err) {
    fastify.log.error(err);
    await dbUtils.closeDBConnection();
    process.exit(1);
  }
};
start(port);
startProcess.onStart(port);
