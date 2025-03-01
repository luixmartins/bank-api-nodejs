import DAO from '../DAO/index.js';


const Owner = { 
    async listOwners() {
        const data = await DAO.list('SELECT * FROM owner');
        
        return data;
    },

    async createOwner(owner) {
        if (owner.name === undefined || owner.cpf === undefined) {
            return {
                status: 400,
                message: 'Invalid data'
            }
        }

        const data = await DAO.create('INSERT INTO owner (cpf, name) VALUES (:cpf, :name)', owner);
        
        return data;
    }, 

    async updateOnwer(owner) {
        if (owner.name === undefined) {
            return {
                status: 400,
                message: 'Invalid data'
            }
        }

        const data = await DAO.update('UPDATE owner SET name = :name WHERE cpf = :cpf', owner);

        return data;
    }, 

    async deleteOwner (cpf) {
        const data = await DAO.delete('DELETE FROM owner WHERE cpf = :cpf', { cpf });

        return data;
    }
}

export default Owner; 