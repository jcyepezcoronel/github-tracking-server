import { ApiProperty } from '@nestjs/swagger';

export class RepoCommitsListParamsDto {
  @ApiProperty({ type: 'number' })
  page: string;
  @ApiProperty({ type: 'number' })
  perPage: string;
}
