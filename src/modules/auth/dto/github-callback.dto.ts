import { ApiProperty } from '@nestjs/swagger';

export class GithubCallbackDto {
  @ApiProperty()
  code: string;
}
