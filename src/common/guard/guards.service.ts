import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ServiceGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('request: ', request);
    const customer = request.user;
    if (customer) {
      return true;
    }
    throw new UnauthorizedException('unauthorized-access');
  }
}
