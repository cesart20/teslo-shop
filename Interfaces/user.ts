export interface IUser {
    _id: string;
    name: string;
    email: string;
    password?: string;
    role: string;

    // agregar createdAt y updatedAt
    createAt?: string;
    updateAt?: string;
}