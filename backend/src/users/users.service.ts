import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { StringSanitizerService } from './services/string-sanitizer.service';
import { CreateUserDto } from './dto/createUser.dto';

import { User } from './enities/user.entity';
import { ServerException } from '../errors/server.exception';
import { ErrorCode } from '../errors/error-codes';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcryptService: BcryptService,
    private readonly stringSanitizerService: StringSanitizerService,
  ) {}

  /* Уникальна ли почта */
  async isEmailUnique(email: string): Promise<boolean> {
    const existingEmail = await this.userRepository.findOne({
      where: { email },
    });
    return !existingEmail;
  }

  /* Уникально ли имя пользователя */
  async isUsernameUnique(username: string): Promise<boolean> {
    const existingUsername = await this.userRepository.findOne({
      where: { username },
    });
    return !existingUsername;
  }

  /* Создание нового пользователя */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, username, ...rest } = createUserDto;

    const lowercaseEmail = this.stringSanitizerService.toLowerCase(email);
    const lowercaseUsername = this.stringSanitizerService.toLowerCase(username);

    // Проверим уникальность username и email
    if (!(await this.isEmailUnique(lowercaseEmail))) {
      throw new ServerException(ErrorCode.EmailTaken);
    }

    if (!(await this.isUsernameUnique(lowercaseUsername))) {
      throw new ServerException(ErrorCode.UsernameTaken);
    }

    // Хешируем пароль
    const hashedPassword = await this.bcryptService.hashPassword(password);

    // Создаем пользователя и сохраняем в базе данных
    const newUser = this.userRepository.create({
      email: lowercaseEmail,
      username: lowercaseUsername,
      password: hashedPassword,
      ...rest,
    });

    return await this.userRepository.save(newUser);
  }

  /* Найти пользователя по id */
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new ServerException(ErrorCode.UserNotFound);
    }
    return user;
  }

  /* Найти пользователя по username */
  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new ServerException(ErrorCode.UserNotFound);
    }
    return user;
  }
}
