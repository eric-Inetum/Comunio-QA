const  swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require('path');

// Basic Meta Informations about our API
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ComuAPI",
      description: "Una api creada para conseguir información de jugadores de futbol registrado en comunio y comuniate.<br><br>[ BaseUrl: localhost/api/v2 ]",
      version: "1.0.0"
    },
    externalDocs: {
      description: "/docs.json",
      url: "http://10.228.64.236:15333/api/v2/docs.json"},
    security: [ { BearerAuth: [] } ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  tags:[
    {
      name: "Jugadores",
      description: "Operaciones relacionadas con jugadores",
    },
    {
      name: "Historial Jugadores",
      description: "Operaciones relacionadas con el historial de los jugadores"
    },
    {
      name:"Gestion de jugadores",
      description: "Añadir un nuevo jugador"
    },
    {
      name:"Bearer Key",
      description: "Proporciona la clave para poder hacer consultas"
    }
  ],
  apis: [
    path.join(__dirname, 'app.js'),
    path.join(__dirname, 'routes', 'player_routes.js'),
    path.join(__dirname, 'routes', 'historial_routes.js'),
    path.join(__dirname, 'routes', 'update_routes.js'),
    path.join(__dirname, 'routes', 'bearer_key.js' )
  ],
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
  // Route-Handler to visit our docs
  app.use("/api/v2/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Make our docs in JSON format available
  app.get("/api/v2/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(
    `Version 1 Docs are available on http://10.228.64.236:${port}/api/v1/docs`
    );
  };
  
  module.exports = { swaggerDocs };