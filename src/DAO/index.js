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
                    status: 400,
                    data: {
                        message: 'Cannot get data from the database'
                    }
                }
            }

        } catch (error) {
            console.error('Error: ', error);

            return {
                status: 500,
                data: {
                    message: 'Unable to connect to the database'
                }
            }
        }

    },

    async create(query, data) {
        try {
            await sequelize.authenticate();
            try {
                const createItem = await sequelize.query(
                    query,
                    { replacements: data }
                );

                return {
                    status: 201,
                    data: createItem
                }

            } catch (error) {
                return {
                    status: 400,
                    data: {
                        message: 'Invalid data'
                    }
                }
            }

        } catch (error) {
            console.error('Error: ', error);

            return {
                status: 500,
                data: {
                    message: 'Unable to connect to the database'
                }
            }
        }
    }, 

    async update(query, data) {
        try {
            await sequelize.authenticate();
            try {
                const updateItem = await sequelize.query(
                    query,
                    { replacements: data }
                );

                return {
                    status: 200,
                    data: updateItem
                }

            } catch (error) {
                return {
                    status: 400,
                    data: {
                        message: 'Invalid data'
                    }
                }
            }

        } catch (error) {
            console.error('Error: ', error);

            return {
                status: 500,
                data: {
                    message: 'Unable to connect to the database'
                }
            }
        }
    }, 

    async delete(query, data) {
        try {
            await sequelize.authenticate();
            try {
                const deleteItem = await sequelize.query(
                    query,
                    { replacements: data }
                );

                return {
                    status: 200,
                    data: deleteItem
                }

            } catch (error) {
                return {
                    status: 400,
                    data: {
                        message: 'Invalid data'
                    }
                }
            }

        } catch (error) {
            console.error('Error: ', error);

            return {
                status: 500,
                data: {
                    message: 'Unable to connect to the database'
                }
            }
        }
    }
}
export default DAO;