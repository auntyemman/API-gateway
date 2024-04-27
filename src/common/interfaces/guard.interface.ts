import { Role } from '../interfaces/role.interface';

export interface JwtPayload {
  readonly user_id: string;
  readonly role: Role;
}
