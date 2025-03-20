import DAO from "../../DAO/index";
import UserModel from "../../models/userModel";
import Passwords from "../../util/passwords";
import sequelize from "../../config/database";

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

            const user = new UserModel(data)

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
    }
}

export default userController; 