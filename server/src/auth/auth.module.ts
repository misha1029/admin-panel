import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserController } from './auth.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserModel } from './model/user.model'
import { JwtStrategy } from './strategies/auth.strategy'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJWTConfig } from 'src/config/jwt.config'

@Module({
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
		SequelizeModule.forFeature([UserModel])
	],
	controllers: [UserController],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
