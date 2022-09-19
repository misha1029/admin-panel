import { ConfigService } from '@nestjs/config'
import { SequelizeModuleOptions } from '@nestjs/sequelize'

export const getSequelizeConfig = async (
	configService: ConfigService
): Promise<SequelizeModuleOptions> => {
	return {
		dialect: 'postgres',
		host: 'localhost',
		port: 5432,
		database: 'adpanel',
		username: 'postgres',
		password: 'postgres',
		autoLoadModels: true,
		synchronize: true,
	}
}
