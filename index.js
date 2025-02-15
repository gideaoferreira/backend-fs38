import express, { response } from "express";
import cors from "cors";
import User from "./model/User.js";
import syncTableDatabase from "./database/sync-table-database.js";
import Order from "./model/Order.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/product", async (request, response) => {
  try {
  const { name, brand, description } = request.body;
  const product = await Product.create({ name,brand, description });
  return response
  .status(200)
  .json({message:`Produto cadastrado com sucesso`,data:product});
  } catch(error) {
    return response
    .status(500)
    .json(`Nao foi possivel cadastrar o produto ${error.message}`);
  }
});

const initApp = async () => {
  await syncTableDatabase();
  app.listen(port, (error) => {
    if (error) {
      console.error(`App is down: ${error}`);
    }

    console.log("App is running");
  });
};

initApp();
