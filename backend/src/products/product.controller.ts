import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.createProduct(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':number')
  async update(
    @Param('number') number: number, // Изменено на number
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productService.updateProduct(number, updateProductDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get(':number')
  async findOne(@Param('number') number: number): Promise<Product> {
    // Изменено на number
    return await this.productService.findOne(number);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':number') // Изменен путь на ':number'
  async delete(@Param('number') number: number): Promise<void> {
    // Изменено на number
    await this.productService.deleteProduct(number);
  }
}
