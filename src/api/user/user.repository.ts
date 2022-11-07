import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '@api/user/entities/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
