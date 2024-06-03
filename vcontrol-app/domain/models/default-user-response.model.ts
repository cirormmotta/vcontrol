import { DefaultResponseModel } from "./default-response.model"
import { UserModel } from "./user.model"

export interface DefaultUserResponseModel extends DefaultResponseModel {
    user: UserModel
}