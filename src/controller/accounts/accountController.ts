import { create } from "domain";

import ResponseController from "../util";
import sequelize from "../../config/database";
import DAO from "../../DAO";
import AccountModel from "../../models/accountModel";

const AcccountController = {
    async createAccount(data: any): Promise<ResponseController> {
        try {
            await sequelize.authenticate();

            const { account_type, users_id } = data;

            console.log(data)

            if (!account_type || !users_id) {
                return {
                    status: 400,
                    message: "All fields are required."
                }
            }

            const account = new AccountModel({ 
                account_type,
                users_id
            })

            const query = `INSERT INTO accounts (account_number, account_type,  users_id) VALUES (?, ?, ?);`;
            const values = [account.account_number, account.account_type,  account.users_id];

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