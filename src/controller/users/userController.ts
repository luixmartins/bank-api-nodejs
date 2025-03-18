import DAO from "../../DAO/index";
import UserModel from "../../models/userModel";
import Passwords from "../../util/passwords";

const userController = {
    async createUser(data: any) { 
        try {   
            if (!Passwords.validatePasswords(data.password)) { 
                return { 
                    "message": "Password doesn't match with the Regex operator"
                } 
            }
            data.password = Passwords.generateHashForPasswords(data.password)

            const user = new UserModel(data)
            
            
        } catch(error) { 

        }
    }
}

export default userController; 