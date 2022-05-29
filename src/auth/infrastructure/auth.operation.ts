import { injectable } from 'inversify';
import { OperationRepository } from '../../shared/infrastructure/operation.repository';
import { User } from '../../user/entities/user.entity';
import { AuthRepository } from '../application/auth.repository';

@injectable()
export class AuthOperation extends OperationRepository<User> implements AuthRepository {
  constructor(){
    super(User);
  }
}