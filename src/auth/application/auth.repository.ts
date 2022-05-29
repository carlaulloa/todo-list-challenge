import { RepositoryBase } from '../../shared/application/base.repository';
import { User } from '../../user/entities/user.entity';

export interface AuthRepository extends RepositoryBase<User> {
}