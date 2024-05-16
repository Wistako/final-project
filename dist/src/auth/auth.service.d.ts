import { UserService } from 'src/user/user.service';
import { RegisterDTO } from './dto/RegisterDTO.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private userService;
    private jwtService;
    private configService;
    constructor(userService: UserService, jwtService: JwtService, configService: ConfigService);
    register(registrationData: RegisterDTO): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    validateUser(email: string, password: string): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    createSession(user: any): Promise<{
        access_token: string;
    }>;
}
