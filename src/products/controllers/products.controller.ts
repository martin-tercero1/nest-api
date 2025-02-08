import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  // ParseIntPipe
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// Use our ParseInt implementation
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';

import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dtos';

// import { Response } from 'express';

import { ProductsService } from 'src/products/services/products.service';

@ApiTags('products')
// Since we now have a controller for each resource, we can remove the prefix from the routes
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {
    // This is the way to inject a service into a controller
  }

  // Is exposed by using the @Get decorator
  // In Nest it does not matter if we include a slash at the end or not
  @Get('/')
  @ApiOperation({ summary: 'List of products' })
  // method
  getMany(
    @Query('limit', ParseIntPipe) limit: number = 100,
    @Query('offset', ParseIntPipe) offset: number = 0,
    @Query('brand') brand: string,
  ): object {
    // The best way to communicate from the backend is with JSON
    // return {
    //   message: `Products with a limit of ${limit} and offset of ${offset} - ${brand}`,
    // };
    return this.productsService.findAll();
  }
  // All endpoints that are not dynamic should be declared first
  @Get('/filter')
  getFiltered(@Param('filter') filter: string): object {
    return { message: `Products filtered by ${filter}` };
  }

  @Get('/:productId')
  // We can also specify the status code of the response
  // Although by defauilt nest will return a 200 status code
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(
    // We can also use the @Res decorator to access the response object and do it the Express way
    // @Res() respose: Response,
    @Param('productId', ParseIntPipe) productId: number,
  ): any {
    // return { message: `Product - ID: ${productId}` };
    // respose.status(202).send({ message: `Product - ID: ${productId}` });
    return this.productsService.findOne(productId);
  }

  @Post('/')
  // We ca also specify which attributes we want to receive, but there are better ways to do this
  create(@Body() payload: CreateProductDto): object {
    // return {
    //   message: 'Creating a product',
    //   payload,
    // };
    return this.productsService.create(payload);
  }

  @Put('/:productId')
  update(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() payload: UpdateProductDto,
  ): object | null {
    // return {
    //   message: 'Updating a product',
    //   productId,
    //   payload,
    // };

    return this.productsService.update(productId, payload);
  }

  @Delete('/:productId')
  // We are sure the id will be converted into a number, thanks to the pipe specified in the Param
  // If it is not convertible, then an error will be thrown.
  delete(@Param('productId', ParseIntPipe) productId: number): object {
    return this.productsService.delete(productId);
  }
}
