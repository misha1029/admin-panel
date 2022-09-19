import { Column, Model, Table, HasMany } from 'sequelize-typescript'
import { ReviewModel } from 'src/review/model/review.model'

@Table({
	tableName: 'User',
	deletedAt: false,
	version: false,
	defaultScope: {
		attributes: {
			exclude: ['password'],
		},
	},
})
export class UserModel extends Model<UserModel, UserModel> {
	@Column
	name: string

	@Column({ unique: true })
	email: string

	@Column
	password: string

	@Column({ field: 'avatar_path' })
	avatarPath: string

	@HasMany(() => ReviewModel)
	review: ReviewModel[]
}
