import { ClassValidatorFields } from "@/shared/infrastructure/env-config/domain/entities/validators/class-validator-fields";
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, isDate } from "class-validator";
import { UserProps } from "../entities/user.entity";

export class UserRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @MaxLength(255)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  password: string

  @IsDate()
  @IsOptional()
  createdAt?: Date

  constructor(data: UserProps) {
    Object.assign(this, data)
  }
}

export class UserValidator extends ClassValidatorFields<UserRules>{
  validate(data: UserProps): boolean {
    var rules = new UserRules(data ?? ({} as UserProps));
    return super.validate(rules)
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator()
  }
}

