"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.setGlobalPrefix('api');
    app.enableCors();
    app.use(cookieParser());
    const configService = app.get(config_1.ConfigService);
    await app.enableShutdownHooks();
    await app.listen(configService.get('port'));
}
bootstrap();
//# sourceMappingURL=main.js.map