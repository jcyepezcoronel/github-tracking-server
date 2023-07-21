import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'test@mail.com' })
  email: string;
  @ApiProperty({ example: '123456' })
  password: string;
}
