import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private usersService;
    constructor(configService: ConfigService, usersService: UserService);
    validate(payload: any): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
}
export {};
