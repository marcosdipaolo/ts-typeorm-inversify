import {
  controller,
  httpGet,
  httpPost,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import BaseController from "./BaseController";
import { JsonResult } from "inversify-express-utils/lib/results";
import { inject } from "inversify";
import { TYPES } from "../../container/constants";
import { DataSource, Repository } from "typeorm";
import { User } from "../../entities/User.entity";
import Order from "../../entities/Order.entity";
import Product from "../../entities/Product.entity";

@controller("/users")
class UserController extends BaseController<User> {
  productRepository: Repository<Product>;
  constructor(@inject(TYPES.DataSource) dataSource: DataSource) {
    super();
    this.repository = dataSource.getRepository(User);
    this.productRepository = dataSource.getRepository(Product);
  }
  @httpGet("/")
  async getUsers(): Promise<JsonResult> {
    return this.json(await this.repository.find());
  }
  @httpGet("/:id")
  async getUser(@requestParam("id") id: string): Promise<JsonResult> {
    return this.json(
      await this.repository.findOne({
        where: { id },
      }),
    );
  }
  @httpPost("/")
  async createUser(
    @requestBody() body: { name: string; email: string },
  ): Promise<JsonResult> {
    const { name, email } = body;
    const user = new User(name, email);
    return this.json(await this.repository.save(user));
  }

  @httpPost("/:id/orders")
  async addOrder(
    @requestParam("id") id: string,
    @requestBody() body: { products: { name: string; price: number }[] },
  ) {
    const { products: productInput } = body;
    const totalPrice = productInput.reduce(
      (acc, product) => acc + product.price,
      0,
    );
    const user = await this.repository.findOneBy({
      id,
    });
    const order = new Order();
    order.totalPrice = totalPrice;
    const productInstances = productInput.map((product) => {
      const productInstance = new Product();
      productInstance.name = product.name;
      productInstance.price = product.price;
      return productInstance;
    });
    const savedProducts = await this.productRepository.save(productInstances);
    order.products = savedProducts;
    user.orders = [order];
    await this.repository.save(user);
    return this.json(order);
  }
}

export default UserController;
