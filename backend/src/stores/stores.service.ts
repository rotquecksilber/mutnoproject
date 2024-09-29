import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { CreateStoreDto } from './dto/createStore.dto';
import { UpdateStoreDto } from './dto/updateStore.dto';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  // Создание нового магазина
  async createStore(createStoreDto: CreateStoreDto): Promise<Store> {
    const store = this.storeRepository.create(createStoreDto);
    return await this.storeRepository.save(store);
  }

  // Обновление магазина
  async updateStore(
    id: number,
    updateStoreDto: UpdateStoreDto,
  ): Promise<Store | null> {
    await this.storeRepository.update(id, updateStoreDto);
    return await this.storeRepository.findOne({ where: { id } });
  }

  // Получение всех магазинов
  async getStores(): Promise<Store[]> {
    return await this.storeRepository.find();
  }
}
