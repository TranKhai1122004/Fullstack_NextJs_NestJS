import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateAuthDto {

    @IsNotEmpty({ message: "Email cannot be empty" })
    email: string;

    @IsNotEmpty({ message: "Password cannot be empty" })
    password: string;

    @IsOptional()
    name: string;
}

export class CodeAuthDto {

    @IsNotEmpty({ message: "Id cannot be empty" })
    _id: string;

    @IsNotEmpty({ message: "Verification cannot be empty" })
    code: string;


}

export class ChangePasswordAuthDto {
    @IsNotEmpty({ message: "Code cannot be empty" })
    code: string;

    @IsNotEmpty({ message: "Password cannot be empty" })
    password: string;

    @IsNotEmpty({ message: "Confirm Password cannot be empty" })
    confirmPassword: string;

    @IsNotEmpty({ message: "Email cannot be empty" })
    email: string;



}

