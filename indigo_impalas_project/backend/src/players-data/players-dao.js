import { Player } from "./schema";

async function createPlayer(player) {
  const dbPlayer = new Player(player);
  await dbPlayer.save();
  return dbPlayer;
}

async function retrievePlayerList() {
  return await Player.find();
}

async function retrievePlayer(id) {
  return await Player.findById(id);
}

async function updatePlayer(player) {
  const dbPlayer = await Player.findOneAndUpdate({ _id: player._id }, player);
  return dbPlayer !== undefined;
}

async function deletePlayer(id) {
  await Player.deleteOne({ _id: id });
}

export {
  createPlayer,
  retrievePlayerList,
  retrievePlayer,
  updatePlayer,
  deletePlayer,
};
