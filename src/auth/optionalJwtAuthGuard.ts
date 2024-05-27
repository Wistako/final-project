import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('Request: ', request);
    if (!request.cookie) {
      console.log('No user found in request');
      return true;
    }
    console.log('User found in request');
    return super.canActivate(context);
  }
}
