import DAO from "../../DAO/index";
import UserModel from "../../models/userModel";
import Passwords from "../../util/passwords";
import sequelize from "../../config/database";
import Auth from "../../services/auth";

interface ResponseController {
    status: Number,
    message?: string,
    body?: Object
}

const userController = {
    async createUser(data: any) {
        if (!Passwords.validatePasswords(data.password)) {
            return {
                status: 400,
                message: "Password doesn't match with the Regex operator"
            }
        }
        try {
            data.password = await Passwords.generateHashForPasswords(data.password)
            const { user_type, name, email, password, document_number } = data
            
            const user = new UserModel({ 
                user_type,
                name,
                email,
                password_hash: password,
                document_number
            })

            await sequelize.authenticate();

            const query = `INSERT INTO users (user_type, name, email, password_hash, document_number) VALUES ('${user.user_type}', '${user.name}', '${user.email}', '${user.password}', '${user.document_number}');`

            const response = await DAO.insertData(query);

            return response;

        } catch (error) {
            return {
                status: 500,
                message: "Cannot connect to database.",
                body: error
            };
        }
    },

    async deleteUser(id: number) {
        try {
            await sequelize.authenticate()

            const query = `DELETE FROM users WHERE id = ${id}`

            return await DAO.deleteData(query)
        } catch (error) {
            return {
                status: 500,
                message: "Cannot connect to database.",
                body: error
            };
        }
    },

    async loginUser(data: any) {
        try {
            await sequelize.authenticate()

            const { email, password } = data


            const userFromDatabase = await DAO.selectData(`SELECT * FROM users WHERE email = '${email}'`)
            if (userFromDatabase.body !== undefined) {
                const user = new UserModel(userFromDatabase.body[0])


        
                const passwordIsValid = await Passwords.compareHashForPasswords(password, user.password)
                
                if (passwordIsValid) {
                    
                    const token = Auth.generateToken({ id: user.id, email: user.email })
                    return {
                        status: 200,
                        message: "User logged in successfully",
                        body: {
                            token,
                            user
                        }
                    }
                } else {
                    return {
                        status: 401,
                        message: "Invalid password"
                    }
                }

            } else {
                return {
                    status: 400,
                    message: "User not found"
                }
            }
        } catch (error) {
            return {
                status: 500,
                message: "Cannot connect to database.",
                body: error
            };
        }

    }

}

export default userController; 