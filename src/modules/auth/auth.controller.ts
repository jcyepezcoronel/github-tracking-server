import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from '../users/users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GithubCallbackDto } from './dto/github-callback.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  signUp(@Body() signInDto: SignInDto) {
    return this.userService.create(signInDto.email, signInDto.password);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  getUser(@Request() req) {
    return this.userService.findOneByEmail(req.user.email);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('github-callback')
  async githubCallback(@Request() req, @Body() body: GithubCallbackDto) {
    await this.userService.saveGithubCredentials(req.user.sub, body.code);
    return { ok: true };
  }
}
