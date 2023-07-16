/**
 * This is a simple RESTful API for dealing with players.
 */
import express from "express";
import {
  createPlayer,
  retrievePlayer,
  retrievePlayerList,
  updatePlayer,
  deletePlayer,
} from "../../players-data/players-dao.js";

// const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const router = express.Router();

// Create new player
router.post("/", async (req, res) => {
  const newPlayer = await createPlayer(req.body);

  if (newPlayer)
    return res
      .status(HTTP_CREATED)
      .header("Location", newPlayer._id)
      .json(newPlayer);

  return res.sendStatus(422);
});

// Retrieve all players
router.get("/", async (req, res) => {
  res.json(await retrievePlayerList());
});

// Retrieve single player
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const player = await retrievePlayer(id);

  if (player) return res.json(player);
  return res.sendStatus(HTTP_NOT_FOUND);
});

// Update player
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const player = req.body;
  player._id = id;
  const success = await updatePlayer(player);
  res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
});

// Delete player
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await deletePlayer(id);
  res.sendStatus(HTTP_NO_CONTENT);
});

export default router;
