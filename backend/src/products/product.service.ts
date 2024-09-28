import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ServerException } from '../errors/server.exception';
import { ErrorCode } from '../errors/error-codes';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = this.productRepository.create(createProductDto);
    return await this.productRepository.save(createdProduct);
  }

  async updateProduct(
    number: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(number);
    await this.productRepository.update(product.id, updateProductDto);
    return this.findOne(number);
  }

  async findOne(number: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { number } });
    if (!product) {
      throw new ServerException(ErrorCode.NumberNotFound);
    }
    return product;
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async deleteProduct(number: number): Promise<void> {
    const result = await this.productRepository.delete({ number });
    if (result.affected === 0) {
      throw new ServerException(ErrorCode.NumberNotFound);
    }
  }
}
