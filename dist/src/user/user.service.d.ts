import { Password, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<User[]>;
    getById(id: User['id']): Promise<User | null>;
    getByEmail(email: User['email']): Promise<(User & {
        password: Password;
    }) | null>;
    create(email: User['email'], password: Password['hashedPassword']): Promise<User>;
    updateById(id: User['id'], email: User['email'], password: string | undefined): Promise<User>;
    deleteById(id: User['id']): Promise<User>;
}
