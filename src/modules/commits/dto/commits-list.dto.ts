import { ApiProperty } from '@nestjs/swagger';

export class CommitsListParamsDto {
  @ApiProperty({ type: 'number' })
  page: string;
  @ApiProperty({ type: 'number' })
  perPage: string;
}
