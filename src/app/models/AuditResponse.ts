import { UserResponse } from "./UserResponse"

export class AuditResponse {
  id!: number
	action!: string
	date!: Date
	userResponse!: UserResponse
	firstName!: string
	lastName!: string
	userName!: string
}
