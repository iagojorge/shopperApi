import express from "express";
import { getLeituras } from "./usecase/listLeitura/controller";
import { confirmLeitura } from "./usecase/confirmResponse/controller";
import { uploadImageController } from "./usecase/uploadImage/controller";
import { AppDataSource } from "./infra/db/data-source";
import { Customer } from "./infra/entity/customer";
import { Measure } from "./infra/entity/measure";


const app = express();
const port = 3000;

app.use(express.json({ limit: '10mb' }));

AppDataSource.initialize()
.then(async () => {

  const customer = new Customer()
  customer.customerCode = "123A"
  await AppDataSource.manager.save(customer)

  const measure = new Measure()
  measure.image = "aaa"
  measure.measureType = "water"
  measure.measureDatetime = new Date()
  measure.hasConfirmed = false
  measure.customer = customer
  await AppDataSource.manager.save(measure)

})
.catch((error) => console.log("Error: ", error))

app.get("/:customerCode/list", getLeituras);

app.patch("/confirm", confirmLeitura);

app.post('/upload', uploadImageController);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
