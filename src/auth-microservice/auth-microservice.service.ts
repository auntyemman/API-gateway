import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';
import { PublisherPattern } from 'src/common/interfaces/publisher-pattern.enum';
import {
  CreateUserDto,
  LoginDto,
  UpdateUserDto,
  ResetPasswordDto,
} from './dto/auth.dto';

@Injectable()
export class AuthMicroserviceService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly clientAuthService: ClientProxy,
  ) {}

  private readonly ISE: string = 'Internal server error';

  connection(): Observable<string> {
    return this.clientAuthService
      .send<string>({ cmd: PublisherPattern.CONNECTION_CHECK }, {})
      .pipe(map((message: string) => message));
  }

  createNewUser(createUserDto: CreateUserDto): Observable<any> {
    try {
      return this.clientAuthService.send<any>(
        { cmd: PublisherPattern.CREATE_NEW_USER },
        createUserDto,
      );
    } catch (error) {
      throw new HttpException(
        error?.message ? error.message : this.ISE,
        error?.status ? error.status : 500,
      );
    }
  }

  createNewAdminUser(createUserDto: CreateUserDto): Observable<any> {
    try {
      return this.clientAuthService.send<any>(
        { cmd: PublisherPattern.CREATE_NEW_ADMIN_USER },
        createUserDto,
      );
    } catch (error) {
      throw new HttpException(
        error?.message ? error.message : this.ISE,
        error?.status ? error.status : 500,
      );
    }
  }

  login(loginDto: LoginDto): Observable<any> {
    try {
      return this.clientAuthService.send<any>(
        { cmd: PublisherPattern.LOGIN },
        loginDto,
      );
    } catch (error) {
      throw new HttpException(
        error?.message ? error.message : this.ISE,
        error?.status ? error.status : 500,
      );
    }
  }

  accountActivation(id: string): Observable<any> {
    try {
      return this.clientAuthService.send<any>(
        { cmd: PublisherPattern.ACCOUNT_ACTIVATION },
        id,
      );
    } catch (error) {
      throw new HttpException(
        error?.message ? error.message : this.ISE,
        error?.status ? error.status : 500,
      );
    }
  }

  forgotPassword(email: string): Observable<any> {
    try {
      return this.clientAuthService.send<any>(
        { cmd: PublisherPattern.FORGOT_PASSWORD },
        email,
      );
    } catch (error) {
      throw new HttpException(
        error?.message ? error.message : this.ISE,
        error?.status ? error.status : 500,
      );
    }
  }

  resetPassword(resetPasswordDto: ResetPasswordDto): Observable<any> {
    try {
      return this.clientAuthService.send<any>(
        { cmd: PublisherPattern.RESET_PASSWORD },
        resetPasswordDto,
      );
    } catch (error) {
      throw new HttpException(
        error?.message ? error.message : this.ISE,
        error?.status ? error.status : 500,
      );
    }
  }

  userProfile(userId: string): Observable<any> {
    try {
      return this.clientAuthService.send<any>(
        { cmd: PublisherPattern.USER_PROFILE },
        userId,
      );
    } catch (error) {
      throw new HttpException(
        error?.message ? error.message : this.ISE,
        error?.status ? error.status : 500,
      );
    }
  }

  updateUser(updateUserDto: UpdateUserDto): Observable<any> {
    try {
      return this.clientAuthService.send<any>(
        { cmd: PublisherPattern.UPDATE_USER },
        updateUserDto,
      );
    } catch (error) {
      throw new HttpException(
        error?.message ? error.message : this.ISE,
        error?.status ? error.status : 500,
      );
    }
  }
}
