import { IsEmpty } from "class-validator";

export class CreateUserDto {
    @IsEmpty()
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    image: string;


}
