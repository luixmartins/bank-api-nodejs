import { create } from "domain";

import ResponseController from "../util";
import sequelize from "../../config/database";
import DAO from "../../DAO";

const AcccountController = {
    async createAccount(data: any): Promise<ResponseController> {
        try {
            await sequelize.authenticate();

            const { account_number, account_type, balance, users_id } = data;

            if (!account_number || !account_type || !balance || !users_id) {
                return {
                    status: 400,
                    message: "All fields are required."
                }
            }

            const query = `INSERT INTO accounts (account_number, account_type, balance, users_id) VALUES ($1, $2, $3, $4)`;
            const values = [account_number, account_type, balance, users_id];

            return await DAO.insertData(query, values);

        } catch (error) {
            return {
                status: 500,
                message: "Cannot connect to database.",
                body: error
            }
        }
    }

}

export default AcccountController; 