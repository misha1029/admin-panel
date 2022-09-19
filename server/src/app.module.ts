import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { getSequelizeConfig } from './config/db.config'
import { AuthModule } from './auth/auth.module'
import { ReviewModule } from './review/review.module'
import { ViewsModule } from './views/views.module'
import { MovieModule } from './movie/movie.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getSequelizeConfig,
		}),
		AuthModule,
		MovieModule,
		ReviewModule,
		ViewsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
