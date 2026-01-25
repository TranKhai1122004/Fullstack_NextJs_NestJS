import { ROLE } from "@/constants/role.enum";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    phone: string;
    address: string;
    image: string;

    @IsOptional()
    @IsEnum(ROLE)
    role?: ROLE;
}
