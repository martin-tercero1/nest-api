import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';

import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class UsersService {
  constructor(private productsService: ProductsService) {}

  private users: User[] = [
    {
      id: 1,
      name: 'Martin',
      lastname: 'Tercero',
      email: 'mail@example.com',
    },
  ];

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  getOrdersByUser(id: number): Order {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
