import {
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
} from "typeorm";
import { User } from "./User.entity";
import Product from "./Product.entity";

@Entity({
  name: "orders",
})
class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column({
    type: "float",
  })
  totalPrice: number;

  @ManyToMany(() => Product, (product) => product.orders, { eager: true })
  @JoinTable({ name: "orderProduct" })
  products: Product[];
}

export default Order;
