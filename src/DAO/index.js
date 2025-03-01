import { QueryTypes } from 'sequelize';
import sequelize from "../config/database.js";

const DAO = {
    async list(query) {
        try {
            await sequelize.authenticate();
            try {
                const getItems = await sequelize.query(
                    query,
                    { type: QueryTypes.SELECT }
                );

                return {
                    status: 200,
                    data: getItems
                }

            } catch (error) {
                console.error('Error: ', error);

                return {
                    status: 500,
                    message: 'Internal server error'
                }
            }

        } catch (error) {
            console.error('Error: ', error);

            return {
                status: 500,
                message: 'Unable to connect to the database'
            }
        }

    }
}

export default DAO;