import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmployersModule } from 'src/employers/employers.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccountsModule } from 'src/accounts/accounts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => EmployersModule),
    forwardRef(() => AccountsModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('PRIVATE_KEY') || 'SECRET';
        return {
          secret,
          signOptions: { expiresIn: '24h' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
