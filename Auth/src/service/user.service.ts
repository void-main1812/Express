import userModel, { User } from "../model/user.model";

export function createUser(input: Partial<User>){
    return userModel.create(input)
}