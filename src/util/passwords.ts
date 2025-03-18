import bcrypt from 'bcrypt'; 

const Passwords = {
    generateHashForPasswords: (password: string) => {
        return bcrypt.hash(password, 10);
    }, 
    
    compareHashForPasswords: (password: string, hash: string) => {
        return bcrypt.compare(password, hash);
    }, 

    validatePasswords: (password: string) => { 
        const regexPass = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/

        return regexPass.test(password) 
    }
}

export default Passwords; 