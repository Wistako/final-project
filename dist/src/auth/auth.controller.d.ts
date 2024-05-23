import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/RegisterDTO.dto';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
export declare class AuthController {
    private authService;
    private configService;
    private userService;
    constructor(authService: AuthService, configService: ConfigService, userService: UserService);
    register(registrationData: RegisterDTO): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    login(req: any, res: any): Promise<void>;
    logout(res: any): Promise<void>;
    getUser(req: any): Promise<any>;
}
