import { model, Schema } from 'mongoose';

export interface IUser {
    email: string,
    password: string,
    name: string
}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const User = model('User', userSchema);

export { User }