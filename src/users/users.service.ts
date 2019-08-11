import { Injectable } from '@nestjs/common';
import { User } from './user';
import { DatabaseModule} from '../database/database.module';

@Injectable()
export class UsersService {
    private readonly users: User[] = [];

    constructor() {
        this.users.push(
          new User(1, 'Dmytri', '123405678'),
          new User(2, 'Simon', 'longpassword'),
        );
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

    async addOne(username: string, pass: string): Promise<boolean> {
        const nextId: number = this.users.length + 1;
        this.users.push(new User(nextId, username, pass));
        return true;
    }
}
