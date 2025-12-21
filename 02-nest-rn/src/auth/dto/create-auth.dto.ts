import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateAuthDto {

    @IsNotEmpty({ message: "Email does not exist" })
    email: string;

    @IsNotEmpty({ message: "Password does not exist" })
    password: string;

    @IsOptional()
    name: string;
}

export class CodeAuthDto {

    @IsNotEmpty({ message: "Id does not exist" })
    _id: string;

    @IsNotEmpty({ message: "Verification code does not exist" })
    code: string;


}

