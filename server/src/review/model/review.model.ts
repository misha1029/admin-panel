import { Column, ForeignKey, BelongsTo, Model, Table } from 'sequelize-typescript'
import { MovieModel } from 'src/movie/model/movie.model'
import { UserModel } from 'src/auth/model/user.model'


@Table({ tableName: 'Review', deletedAt: false, version: false })
export class ReviewModel extends Model<ReviewModel> {

    @Column({ defaultValue: '' })
	description: string


	@ForeignKey(() => UserModel)
	@Column
	userId: number

	@BelongsTo(() => UserModel)
	user: UserModel

	@ForeignKey(() => MovieModel)
	@Column
	movieId: number

	@BelongsTo(() => MovieModel)
	movie: MovieModel

}
