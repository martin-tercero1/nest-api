import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dtos';

// Thanks to the Injectable decorator we will be able
// to use Dependecy injection and use this service in other parts
// like our controllers
@Injectable()
export class ProductsService {
  // Here we handle data on memory as if it were a table in a DB
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'This is product 1',
      stock: 20,
      image: 'https://via.placeholder.com/150',
      price: 100,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'This is product 2',
      stock: 10,
      image: 'https://via.placeholder.com/150',
      price: 200,
    },
  ];
  // In the future, these methods should manipulate or connect to the DB
  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((product) => product.id == id);
    // Check if the product exists - ERROR first approach
    if (!product) {
      throw new HttpException('Error not found', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  create(payload: CreateProductDto) {
    const newProduct = {
      id: this.products.length + 1,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const productToUpdate = this.findOne(id);
    console.log(productToUpdate);
    if (!productToUpdate) {
      return null;
    } else {
      const index: number = this.products.findIndex(
        (product) => product.id === id,
      );
      this.products[index] = {
        ...productToUpdate,
        ...payload,
      };
      return this.products[index];
    }
  }

  delete(id: number) {
    const indexOfProduct = this.products.findIndex(
      (product) => product.id === id,
    );
    this.products.splice(indexOfProduct, 1);
    return {
      message: 'Deleting a product',
      id,
    };
  }
}
