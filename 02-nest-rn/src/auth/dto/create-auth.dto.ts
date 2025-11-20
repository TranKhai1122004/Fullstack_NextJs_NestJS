import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateAuthDto {

    @IsNotEmpty({ message: "Email does not exist" })
    email: string;

    @IsNotEmpty({ message: "Password does not exist" })
    password: string;

    @IsOptional()
    name: string;
}
