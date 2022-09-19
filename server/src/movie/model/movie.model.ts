import { Column, Model, Table, HasMany } from 'sequelize-typescript'
import { ReviewModel } from 'src/review/model/review.model'

@Table({ tableName: 'Movie', deletedAt: false, version: false })
export class MovieModel extends Model<MovieModel> {
	@Column({ unique: true })
	name: string

	@Column({ allowNull: true })
	rating: number

	@Column({ defaultValue: '' })
	poster: string

	@Column({ defaultValue: 0 })
	fees: number

	@HasMany(() => ReviewModel)
	review: ReviewModel[]
}
