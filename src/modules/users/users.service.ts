import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private readonly httpService: HttpService,
  ) {}

  findOneByEmail(email: string) {
    return this.usersRepo.findOne({
      where: { email },
      select: [
        'createdAt',
        'email',
        'githubToken',
        'id',
        'updateAt',
        'password',
      ],
    });
  }

  findOne(id: number) {
    return this.usersRepo.findOneBy({ id });
  }

  async create(email: string, password: string) {
    const userToCreate = this.usersRepo.create({
      email,
      password,
    });
    await this.usersRepo.insert(userToCreate);
    const user = await this.usersRepo.findOneBy({ id: userToCreate.id });
    return user;
  }

  async saveGithubCredentials(userId: number, code: string) {
    const token = await this.getGithubToken(code);
    const githubUser = await this.getGithubUser(token);
    return this.usersRepo.update(
      { id: userId },
      { githubToken: token, githubUsername: githubUser.login },
    );
  }

  async getGithubToken(code: string) {
    const url = 'https://github.com/login/oauth/access_token';
    const dataToSend = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_SECRET_TOKEN,
      code,
    };
    const res = await this.httpService.axiosRef.post<{
      error?: string;
      error_description?: string;
      access_token?: string;
    }>(url, dataToSend, {
      headers: {
        Accept: 'application/json',
      },
    });

    const { error, error_description, access_token } = res.data;
    if (error) {
      throw new BadRequestException(error_description);
    }
    return access_token;
  }

  async getGithubUser(accessToken: string) {
    const url = 'https://api.github.com/user';
    const res = await this.httpService.axiosRef.get<{ login: string }>(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  }
}
