import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { WhereOptions, Op } from 'sequelize'
import { UserModel } from 'src/auth/model/user.model'

import { ReviewModel } from 'src/review/model/review.model'
import { ViewsService } from 'src/views/views.service'
import { MovieDto } from './dto/movie.dto'
import { MovieModel } from './model/movie.model'

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(MovieModel)
		private readonly movieModel: typeof MovieModel
	) {}

	async byId(id: number) {
		const movie = await this.movieModel.findOne({
			where: { id },
			include: [
				{
					model: ReviewModel, // какую модель разскрываем
                    include: [UserModel] // что в этом можели разскрываем
				},
			],
		})
		if (!movie) throw new NotFoundException('Video not found')

		return movie
	}

	async getAll(searchTerm?: string) {
		let option: WhereOptions<MovieModel> = {}

		if (searchTerm)
			option = {
				[Op.or]: [{ name: { like: `%${searchTerm}%` } }],
			}
		return this.movieModel.findAll({
			where: {
				...option,
			},
			order: [['createdAt', 'DESC']],
			include: [
				{
					all: true,
				},
			],
		})
	}

	async create() {
		const movie = await this.movieModel.create()
		return movie.id
	}

	async update(id: number, dto: MovieDto) {
		const movie = await this.byId(id)

		return movie.update({
			...movie,
			...dto,
		})
	}

	async delete(id: number) {
		return this.movieModel.destroy({ where: { id } })
	}

}
