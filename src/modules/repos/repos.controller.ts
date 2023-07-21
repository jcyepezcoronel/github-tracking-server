import {
  Controller,
  Get,
  Query,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReposListParamsDto } from './dto/repos-list.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ReposService } from './repos.service';
import { RepoCommitsListParamsDto } from './dto/repo-commits-list.dto';

@ApiTags('repos')
@Controller('repos')
export class ReposController {
  constructor(private reposService: ReposService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  reposList(@Request() req, @Query() query: ReposListParamsDto) {
    return this.reposService.getReposList(req.user.sub, query);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('/:owner/:name')
  findOne(
    @Request() req,
    @Param('owner') owner: string,
    @Param('name') name: string,
  ) {
    return this.reposService.findOne(req.user.sub, `${owner}/${name}`);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('/:owner/:name/commits')
  findCommits(
    @Request() req,
    @Query() query: RepoCommitsListParamsDto,
    @Param('owner') owner: string,
    @Param('name') name: string,
  ) {
    return this.reposService.findCommits(
      req.user.sub,
      `${owner}/${name}`,
      query,
    );
  }
}
