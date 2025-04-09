import UserModel from "./userModel";

enum AccountType { 
    CORRENTE = 'corrente',
    POUPANCA = 'poupanca',
}

interface Account { 
    id: string, 
    account_number: string, 
    account_type: AccountType,
    balance: number, 
    credit_limit: number, 
    created_at: Date, 
    updated_at: Date, 
    users_id: UserModel, 
}

export default class AccountModel { 
    private props : Account;

    get id() : string {
        return this.props.id;
    } 

    get account_number() : string { 
        return this.props.account_number;
    }

    get account_type() : AccountType { 
        return this.props.account_type;
    }

    get balance() : number { 
        return this.props.balance;
    }

    get credit_limit() : number { 
        return this.props.credit_limit;
    }

    get created_at() : Date { 
        return this.props.created_at;
    }

    get updated_at() : Date { 
        return this.props.updated_at;
    }

    get users_id() : UserModel { 
        return this.props.users_id;
    }
    
    constructor(props: Account) { 
        this.props = props;
    }
}