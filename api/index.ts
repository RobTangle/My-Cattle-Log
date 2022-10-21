// const db = require("./src/models/index");

import db from "./src/models";
const config = require(__dirname + "/src/config/config.js");
const PORT = config.server.port || 3001;
const app = require("./src/app");

// app.listen(PORT, () => {
//   console.log(
//     "**** **** **** **** **** **** **** **** **** **** **** **** **** **** **** "
//   );
//   console.log(`App listening on port ${PORT}`);
//   console.log(
//     "**** **** **** **** **** **** **** **** **** **** **** **** **** **** **** "
//   );
// });

db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(
      "**** **** **** **** **** **** **** **** **** **** **** **** **** **** **** "
    );
    console.log(`App listening on post ${PORT}`);
    console.log(
      "**** **** **** **** **** **** **** **** **** **** **** **** **** **** **** "
    );
  });
});
