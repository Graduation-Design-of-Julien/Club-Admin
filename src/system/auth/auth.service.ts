import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  /**
   * @param uid
   */
  async validateUser(payload: { uid: string }): Promise<User> {
    return await this.userService.findUserByUid(payload.uid);
  }
}
