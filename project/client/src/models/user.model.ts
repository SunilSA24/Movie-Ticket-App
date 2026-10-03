export interface User {
    _id: string | undefined;
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface Owner {
    owner_id: string
}