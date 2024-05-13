import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GoogleGuard extends AuthGuard('google') {
    async canActivate(context: ExecutionContext) {
        console.log("WHYYYYYYYYYYYYYYYYYYY!",context);
        const activate = (await super.canActivate(context)) as boolean;
        console.log("AO VCL THE NHI ?",activate);
        try {
            console.log("SWITCH TO HTTP");
            const request = context.switchToHttp().getRequest();
            console.log("REQUEST : ", request);
            await super.logIn(request);
        } catch (error) {
            console.log("ERROR : ", error);
        }
        console.log("CAN ACTIVATE : ", activate);
        return activate;
    }
}