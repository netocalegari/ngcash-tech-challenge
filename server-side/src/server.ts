import app from "./app";
import AppDataSource from "./data-source";

(async () => {
  await AppDataSource.initialize().catch((err) => {
    console.log(err);
    console.error("Error during Data Source initialization");
  });

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
})();
