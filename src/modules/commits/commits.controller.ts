import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommitsService } from './commits.service';
import { AuthGuard } from '../auth/auth.guard';
import { CommitsListParamsDto } from './dto/commits-list.dto';

@ApiTags('commits')
@Controller('commits')
export class CommitsController {
  constructor(private reposService: CommitsService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  findCommits(@Query() query: CommitsListParamsDto) {
    return this.reposService.findCommits(query);
  }
}
