import { Injectable } from '@nestjs/common';
import { UserRepository } from '@api/user/user.repository';
import { UserEntity } from '@api/user/entities/user.entity';
import { BaseService } from '@common/service/base.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService extends BaseService<UserEntity, UserRepository> {
  constructor(@InjectRepository(UserRepository) repository: UserRepository) {
    super(repository);
  }

  async findOneEmail(email: string): Promise<UserEntity> {
    return await this.repository.findOne({ email });
  }

  async findOneId(id: string): Promise<UserEntity> {
    return await this.repository.findOne(id);
  }
}
