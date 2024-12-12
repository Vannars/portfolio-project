const request = require("request");
require("dotenv").config();
const filesys = require("fs");
const path = require("path");

//This is probabaly not a good way of doing this - but i need to generate new access tokens as it expires every 5 days
function newAccessToken(callback) {
  //I have taken the client id and secret from the env fil
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  // the url is the twitch url which is needed for generating and accces token
  const tokenUrl = "https://id.twitch.tv/oauth2/token";
  //this data will go in the post request body - the id and scecret are the passwords - big string time
  const tokenData = `client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;

  //post request to twitch url using the above
  request.post(
    {
      url: tokenUrl,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenData,
    },
    //errors and callback
    (err, response, body) => {
      if (err) {
        console.log("Error - could not generate access token:", err);
        return callback(err);
      }

      // if it went well- the json response will contain a body which i take/parse into a variable
      const tokenResponse = JSON.parse(body);
      //then i specify the access token from that variable response
      const accessToken = tokenResponse.access_token;

      // With the acces token defined, it can update the env file with it
      const pathToEnv = path.resolve(__dirname, "../.env"); // this is the path to the .env file
      //now i can use file system to read the .env file
      filesys.readFile(pathToEnv, "utf8", (err, data) => {
        // utf8 is standard
        if (err) {
          // error handling
          console.log("Error reading .env file:", err);
          return callback(err);
        }

        // now i define the update which uses the access token:
        const updateEnv = data.replace(
          /ACCESS_TOKEN=.*/,
          `ACCESS_TOKEN=${accessToken}`
        );

        // then i write the in the env file using the path to the env (and standar utf8)
        filesys.writeFile(pathToEnv, updateEnv, "utf8", (err) => {
          if (err) {
            console.log("Error: Could not write to .env file:", err);
            return callback(err);
          }

          console.log("Success! Access token refreshed.");
          callback(null, accessToken);
        });
      });
    }
  );
}

//This function searches the IGDB database
const apisearch = (search, callback) => {
  // each time a user searches a new access token is generated to prevent expiary - AN AWFUL SOLUTION REALLY
  // if multiple users tried to search - this would not work
  // - but it secures the access token and stops it expiring so im not going to change it for this
  newAccessToken((err, accessToken) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    //gamedata object acceses the IGDB API using the url, client id and access token
    // the body takes a search term and returns th id, name and release date of the game
    const clientId = process.env.TWITCH_CLIENT_ID;
    const gamedata = {
      url: `https://api.igdb.com/v4/games`,
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${accessToken}`,
      },
      body: `search "${search}"; fields id, name, first_release_date;`,
    };
    // This post request uses the gamedata object - check errors - sets up an array for games and returns the first occurance of a game in list of games
    // the callback function basically returns the first occuraces of games in the list
    request.post(gamedata, function (err, response, body) {
      if (err) {
        console.log(err);
        return callback(err);
      } else {
        const firstInList = [];
        const seenGames = new Set();
        const games = JSON.parse(body); //json body
        games.forEach((game) => {
          if (!seenGames.has(game.name)) {
            firstInList.push(game);
            seenGames.add(game.name);
          }
        });
        callback(null, firstInList);
      }
    });
  });
};
module.exports = { apisearch };
