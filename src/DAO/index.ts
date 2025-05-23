import { QueryTypes } from 'sequelize';

import sequelize from '../config/database';

interface ResponseFromDatabase {
    status: number;
    message: string;
    body?: object;
}

const errorMessage = (error: any) => {
    return error instanceof Error ? error.message : "Unknown error occurred";
}

const DAO = {
    async insertData(query: string, values?: any[]): Promise<ResponseFromDatabase> {
        try {
            await sequelize.authenticate();

            try {
                await sequelize.query(query, { replacements: values, type: QueryTypes.INSERT });
                
                return {
                    status: 201,
                    message: "Data entered successfully"
                };

            } catch (error) {
                return {
                    status: 500,
                    message: errorMessage(error)
                };
            }
        } catch (error) {
            return {
                status: 503,
                message: "Unable to connect to the database."
            };
        }
    },


    async selectData(query: string): Promise<ResponseFromDatabase> {
        try {
            await sequelize.authenticate();

            try {
                const result = await sequelize.query(query, { type: QueryTypes.SELECT });

                return {
                    status: 200,
                    message: "OK",
                    body: result
                };

            } catch (error) {
                return {
                    status: 500,
                    message: errorMessage(error)
                };
            }
        } catch (error) {
            return {
                status: 503,
                message: "Unable to connect to the database."
            };
        }
    },
    async updateData(query: string): Promise<ResponseFromDatabase> {
        try {
            await sequelize.authenticate();

            try {
                const response = await sequelize.query(query, { type: QueryTypes.UPDATE });

                console.log(response)
                return {
                    status: 204,
                    message: "Data has been updated"
                };

            } catch (error) {
                return {
                    status: 500,
                    message: errorMessage(error)
                };
            }
        } catch (error) {
            return {
                status: 503,
                message: "Unable to connect to the database."
            };
        }
    },

    async deleteData(query: string): Promise<ResponseFromDatabase> {
        try {
            await sequelize.authenticate();

            try {
                await sequelize.query(query, { type: QueryTypes.DELETE });

                return {
                    status: 204,
                    message: "Data has been deleted"
                };

            } catch (error) {
                return {
                    status: 500,
                    message: errorMessage(error)
                };
            }
        } catch (error) {
            return {
                status: 503,
                message: "Unable to connect to the database."
            };
        }
    }
}

export default DAO;