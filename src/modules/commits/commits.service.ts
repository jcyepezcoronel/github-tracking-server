import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CommitsListParamsDto } from './dto/commits-list.dto';

@Injectable()
export class CommitsService {
  private githubProyectUserToken = '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';
  private githubProyectFullname = 'jcyepezcoronel/github-tracking-web';

  constructor(private readonly httpService: HttpService) {}

  async findCommits(params: CommitsListParamsDto) {
    try {
      const url = `https://api.github.com/repos/${this.githubProyectFullname}/commits?page=${params.page}&per_page=${params.perPage}`;
      const res = await this.httpService.axiosRef.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${this.githubProyectUserToken}`,
        },
      });
      return res.data;
    } catch (err) {
      throw new BadRequestException(err.response?.data?.message);
    }
  }
}
