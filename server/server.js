const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");
const path = require("path");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 8080;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const startApollo = async (typeDefs, resolvers) => {
  server.start().then((res) => {
    server.applyMiddleware({ app });

    // if we're in production, serve client/build as static assets
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../client/")));
    }

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/public/index.html"));
    });

    db.once("open", () => {
      app.listen(PORT, () =>
        console.log(`🌍 Now listening on localhost:${PORT}`)
      );
    });
  });
};

startApollo(typeDefs, resolvers);
