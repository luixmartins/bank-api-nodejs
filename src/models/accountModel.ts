import UserModel from "./userModel";
import { v4 as UUIDV4 } from "uuid";

enum AccountType { 
    CORRENTE = 'corrente',
    POUPANCA = 'poupanca',
}

interface Account { 
    id?: Int16Array, 
    account_number?: string, 
    account_type: AccountType,
    balance?: number, 
    credit_limit?: number, 
    created_at?: Date, 
    updated_at?: Date, 
    users_id: UserModel, 
}

export default class AccountModel { 
    private props : Account;

    get id() : string {
        return this.props.id ? this.props.id.toString() : '';
    } 

    get account_number() : string { 
        return this.props.account_number || '';
    }

    get account_type() : AccountType { 
        return this.props.account_type;
    }

    get balance() : number { 
        return this.props.balance ?? 0;
    }

    get credit_limit() : number { 
        return this.props.credit_limit ?? 0;
    }

    get created_at() : Date { 
        return this.props.created_at ?? new Date(0);
    }

    get updated_at() : Date { 
        return this.props.updated_at ?? new Date(0);
    }

    get users_id() : UserModel { 
        return this.props.users_id;
    }

    constructor(props: Account) { 
        props.account_number = UUIDV4();
         
        this.props = props;
    }
}