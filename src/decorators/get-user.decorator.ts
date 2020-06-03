import { createParamDecorator } from "@nestjs/common";
import { User } from "src/entities/user.entity";

export const GetUser = createParamDecorator((data, req): User => {
    console.log(req.args.find(item => item.res)['user'])
    return req.args.find(item => item.res)['user'];
    // return req.user;
})