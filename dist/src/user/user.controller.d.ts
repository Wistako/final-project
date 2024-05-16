import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAll(): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    getById(id: string): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
}
