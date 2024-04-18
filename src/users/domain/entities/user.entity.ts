import { Entity } from "@/shared/infrastructure/env-config/domain/entities/entity";
import { UserValidatorFactory } from "../validators/user.validator";

export type UserProps = {
  name: string
  email: string
  password: string,
  createdAt?: Date
}

export type UserPropsUpdate = {
  name: string
  email: string
}

export class UserEntity extends Entity<UserProps> {
  constructor(public readonly props: UserProps, id?: string) {
    UserEntity.validate(props);
    super(props, id)
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  update(props: UserPropsUpdate): void {
    UserEntity.validate({...this.props, name: props.name, email: props.email});
    this.name = props.name
    this.email = props.email
  }

  updatePassword(value: string): void {
    UserEntity.validate({...this.props, password: value});
    this.password = value
  }

  get name(){
    return this.props.name
  }

  private set name(value: string) {
    this.props.name = value
  }

  get email(){
    return this.props.email
  }

  private set email(value: string) {
    this.props.email = value
  }

  get password(){
    return this.props.password
  }

  private set password(value: string) {
    this.props.password = value
  }

  get createdAt(){
    return this.props.createdAt
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create()
    validator.validate(props)
  }
}
