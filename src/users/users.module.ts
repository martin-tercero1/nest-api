import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ProductsModule],
  providers: [UsersService],
})
export class UsersModule {}
