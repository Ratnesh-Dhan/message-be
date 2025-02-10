const httpServer = require("./src/app.js");
require("dotenv").config();

httpServer.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
