import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { Player } from "./schema";
import { createPlayer } from "./players-dao";

export async function main() {
  await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
  console.log("Connected to database!");
  console.log();

  await clearDatabase();
  console.log();

  // await addPlayers();
  // console.log();

  // Disconnect when complete
  // await mongoose.disconnect();
  // console.log("Disconnected from database!");
}

async function clearDatabase() {
  const playersDeleted = await Player.deleteMany({});
  console.log(
    `Cleared database (removed ${playersDeleted.deletedCount} players).`
  );
}

// Hardcoded players list for testing
const players = [
  { name: "Abra", placement: 180, image: "/images/Abra.png" },
  { name: "Clefairy", placement: 500, image: "/images/Clefairy.png" },
  { name: "Nidorina", placement: 1200, image: "/images/Nidorina.png" },
  { name: "Dratini", placement: 2800, image: "/images/Dratini.png" },
  { name: "Scyther", placement: 5500, image: "/images/Scyther.png" },
  { name: "Porygon", placement: 9999, image: "/images/Porygon.png" },
];

async function addPlayers() {
  for (let player of players) {
    const dbPlayer = await createPlayer(player);
    console.log(
      `Player '${dbPlayer.name}' added to database (_id = ${dbPlayer._id})`
    );
  }
}
