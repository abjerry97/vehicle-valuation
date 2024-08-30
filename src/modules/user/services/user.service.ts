import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    const user = new User();
    user.username = 'jerry1';
    user.email = 'jerry1@example.com';
    user.password = 'jerry';

    await this.usersRepository.save(user);

    return await this.usersRepository.find();
  }
}
