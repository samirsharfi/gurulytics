import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service'; // Import the UsersService
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Validate user credentials by checking the email and password.
   * @param email - User's email
   * @param password - User's plaintext password
   * @returns User object if validation is successful
   * @throws UnauthorizedException if credentials are invalid
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return { id: user._id, email: user.email, name: user.first_name };
  }

  /**
   * Generate a JWT token for the authenticated user.
   * @param user - Authenticated user object
   * @returns Object containing the access token
   */
  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
