enum UserType { 
    individual = 'individual', 
    corporate = 'corporate'
} 

interface User { 
    id?: Int16Array; 
    user_type: UserType; 
    name: string; 
    email: string; 
    password: string; 
    document_number: string;  
    created_at?: Date; 
}

const emailRegex: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/

class UserModel { 
    private props: User; 

    constructor(props: User) { 
        if(emailRegex.test(props.email) === false) { 
            throw new Error('Invalid email'); 
        }
        this.props = props; 
    }
}

export default UserModel; 