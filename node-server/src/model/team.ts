import {User} from './user';

export class Team {
    constructor(id: string, users: [User]) {
        this.id = id;
        this.users = users;
    }

    id: string;
    users: [User];

    public addUser(userNew: User) {
        // if(!this.users.find(user => user.id === userNew.id)) {
            this.users.push(userNew);
        // }
    }
}