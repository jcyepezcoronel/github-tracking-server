import { ApiProperty } from "@nestjs/swagger";

export class ReposListParamsDto {
  @ApiProperty({ type: 'number' })
  page: string;
  @ApiProperty({ type: 'number' })
  perPage: string;
}