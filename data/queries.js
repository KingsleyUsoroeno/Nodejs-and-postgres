// We are using the nodWe’ll be using the node-postgres module to create a pool of connections.
//This way we don’t have to open a client and close it every time we make a query.
const pool = require("../data/postgres_connection");
const { verifyToken, verifyUser } = require("../data/verification");

const express = require("express");
const Router = express.Router();

Router.get("/", verifyUser, (req, res) => {
  pool.query("SELECT * FROM person ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// Get a User with a particular id in the Db
Router.get("/:id", verifyUser, (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM person WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows[0]);
  });
});

// Add a new user to the Db
Router.post("/", verifyUser, (req, res) => {
  const { first_name, last_name, gender, date_of_birth } = request.body;

  pool.query(
    "INSERT INTO person (first_name, last_name, gender, date_of_birth) VALUES ($1, $2, $3, $4)",
    [first_name, last_name, gender, date_of_birth],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        message: "User added successfully"
      });
    }
  );
});

Router.put("/:id", verifyUser, (req, res) => {
  console.log(`id from request is ${request.params.id}`);

  const id = parseInt(req.params.id);
  const { first_name, last_name, gender, date_of_birth } = request.body;

  pool.query(
    "UPDATE person SET first_name = $1, last_name = $2, gender = $3, date_of_birth = $4 WHERE id = $5",
    [first_name, last_name, gender, date_of_birth, id],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.status(200).json({
        message: "User Successfully Updated"
      });
    }
  );
});

Router.delete("/:id", verifyUser, (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM person WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json({
      message: `User deleted with ID: ${id}`
    });
  });
});

module.exports = Router;
