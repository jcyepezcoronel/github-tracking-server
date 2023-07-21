import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ReposListParamsDto } from './dto/repos-list.dto';
import { UsersService } from '../users/users.service';
import { RepoCommitsListParamsDto } from './dto/repo-commits-list.dto';

@Injectable()
export class ReposService {
  constructor(
    private readonly httpService: HttpService,
    private userService: UsersService,
  ) {}
  async getReposList(userId: number, params: ReposListParamsDto) {
    const user = await this.userService.findOne(userId);
    if (!user.githubToken || !user.githubUsername)
      throw new BadRequestException('invalid access token');

    const url = `https://api.github.com/users/${user.githubUsername}/repos?page=${params.page}&per_page=${params.perPage}`;
    const res = await this.httpService.axiosRef.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${user.githubToken}`,
      },
    });
    return res.data;
  }

  async findOne(userId: number, fullName: string) {
    const user = await this.userService.findOne(userId);
    if (!user.githubToken || !user.githubUsername)
      throw new BadRequestException('invalid access token');

    const url = `https://api.github.com/repos/${fullName}`;
    const res = await this.httpService.axiosRef.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${user.githubToken}`,
      },
    });
    return res.data;
  }

  async findCommits(
    userId: number,
    fullName: string,
    params: RepoCommitsListParamsDto,
  ) {
    const user = await this.userService.findOne(userId);
    if (!user.githubToken || !user.githubUsername)
      throw new BadRequestException('invalid access token');

    try {
      const url = `https://api.github.com/repos/${fullName}/commits?page=${params.page}&per_page=${params.perPage}`;
      const res = await this.httpService.axiosRef.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${user.githubToken}`,
        },
      });
      return res.data;
    } catch (err) {
      throw new BadRequestException(err.response?.data?.message);
    }
  }
}
