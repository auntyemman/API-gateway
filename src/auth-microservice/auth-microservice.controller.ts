import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  UseFilters,
  HttpException,
  UseGuards,
  Req,
  Patch,
  Redirect,
} from '@nestjs/common';
import { Response } from 'express';
import { catchError, map, Observable } from 'rxjs';
import { AuthMicroserviceService } from './auth-microservice.service';
import {
  CreateUserDto,
  LoginDto,
  UpdateUserDto,
  ResetPasswordDto,
} from './dto/auth.dto';
import { AllGlobalExceptionsFilter } from '../common/filters/rpc-filter.filter';
import { JwtAuthGuard } from 'src/common/guard/jwt.guard';
import { ConfigService } from '@nestjs/config';
import { GoogleOAuthGuard } from 'src/common/guard/google-auth.guard';

@Controller('auth-microservice')
@UseFilters(AllGlobalExceptionsFilter)
export class AuthMicroserviceController {
  constructor(
    private readonly authMicroserviceService: AuthMicroserviceService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/connect')
  connection(): Observable<any> {
    return this.authMicroserviceService.connection();
  }

  @Post('sign-in')
  createNewUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Observable<Response> {
    return this.authMicroserviceService
      .createNewUser(createUserDto)
      .pipe(
        catchError((error) => {
          throw new HttpException(error.message, error.status);
        }),
      )
      .pipe(
        map((resp) => {
          return res.status(201).json({
            message: 'Successfully created new user!',
            data: resp,
          });
        }),
      );
  }

  @Post('admin-sign-in')
  createNewAdminUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Observable<Response> {
    return this.authMicroserviceService
      .createNewAdminUser(createUserDto)
      .pipe(
        catchError((error) => {
          throw new HttpException(error.message, error.status);
        }),
      )
      .pipe(
        map((resp) => {
          return res.status(201).json({
            message: 'Successfully created new admin user!',
            data: resp,
          });
        }),
      );
  }

  @Post('login')
  login(
    @Body() loginDto: LoginDto,
    @Res() res: Response,
  ): Observable<Response> {
    return this.authMicroserviceService
      .login(loginDto)
      .pipe(
        catchError((error) => {
          throw new HttpException(error.message, error.status);
        }),
      )
      .pipe(
        map((resp) => {
          return res.status(200).json({
            message: 'Successfully logged in user!',
            data: resp,
          });
        }),
      );
  }

  @Post('activate-account/:id')
  accountActivation(
    @Res() res: Response,
    @Param('id') id: string,
  ): Observable<Response> {
    return this.authMicroserviceService
      .accountActivation(id)
      .pipe(
        catchError((error) => {
          throw new HttpException(error.message, error.status);
        }),
      )
      .pipe(
        map((resp) => {
          return res.status(200).json({
            message: 'Successfully activated account!',
            data: resp,
          });
        }),
      );
  }

  @Post('forgot-password')
  forgotPassword(
    @Res() res: Response,
    @Body('email') email: string,
  ): Observable<Response> {
    return this.authMicroserviceService
      .forgotPassword(email)
      .pipe(
        catchError((error) => {
          throw new HttpException(error.message, error.status);
        }),
      )
      .pipe(
        map((resp) => {
          return res.status(200).json({
            message: 'Successfully sent password reset email',
            data: resp,
          });
        }),
      );
  }

  @Post('reset-password/:token')
  resetPassword(
    @Res() res: Response,
    @Param('token') token: string,
    @Body('password') password: string,
    @Body('confirmPassword') confirmPassword: string,
  ): Observable<Response> {
    function payload(): ResetPasswordDto {
      return {
        token,
        password,
        confirmPassword,
      };
    }

    return this.authMicroserviceService
      .resetPassword(payload())
      .pipe(
        catchError((error) => {
          throw new HttpException(error.message, error.status);
        }),
      )
      .pipe(
        map((resp) => {
          return res.status(200).json({
            message: 'Successfully reset password',
            data: resp,
          });
        }),
      );
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  userProfile(@Res() res: Response, @Req() req: any): Observable<Response> {
    const userId = req.user.user_id;
    console.log(req);
    return this.authMicroserviceService
      .userProfile(userId)
      .pipe(
        catchError((error) => {
          throw new HttpException(error.message, error.status);
        }),
      )
      .pipe(
        map((resp) => {
          return res.status(200).json({
            message: 'Successfully retrieved user profile',
            data: resp,
          });
        }),
      );
  }

  @Patch('/update/:userId')
  @UseGuards(JwtAuthGuard)
  updateUser(
    @Res() res: Response,
    @Req() req: any,
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Observable<Response> {
    updateUserDto.userId = req.user.user_id;
    return this.authMicroserviceService
      .updateUser(updateUserDto)
      .pipe(
        catchError((error) => {
          throw new HttpException(error.message, error.status);
        }),
      )
      .pipe(
        map((resp) => {
          return res.status(200).json({
            message: 'Successfully updated user',
            data: resp,
          });
        }),
      );
  }

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  @Redirect()
  googleAuth(@Res() res: any): any {
    const scope = encodeURIComponent('email profile');
    const state = encodeURIComponent('007');
    const googleAuthUrl = `${this.configService.get('GOOGLE_OAUTH_BASE_URL')}?response_type=code&client_id=${this.configService.get('GOOGLE_OAUTH_CLIENT_ID')}&redirect_uri=${this.configService.get('GOOGLE_OAUTH_CALLBACK_URL')}&scope=${scope}&state=${state}`;
    return { url: googleAuthUrl };
  }

  @Get('google-callback')
  @UseGuards(GoogleOAuthGuard)
  googleAuthCallback(@Req() req: any, @Res() res: any) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
