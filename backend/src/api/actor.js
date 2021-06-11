import { DB_SERVICE } from "../db/dbService.js";

export const actorApi = (req, res) => res.json(DB_SERVICE.getActors());

export const favoriteActorApi = (req, res) =>
  res.json(DB_SERVICE.getFavouritesByUser(req.userId));

export const updateFavouriteActorApi = (req, res) => {
  if (DB_SERVICE.toggleFavouriteActor(req.userId, req.body.favourite)) {
    const favourites = DB_SERVICE.getFavouritesByUser(req.userId).favourites;
    res.status(200).json(favourites);
  } else {
    res.status(400).send();
  }
};
