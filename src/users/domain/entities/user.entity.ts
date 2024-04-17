import { Entity } from "@/shared/infrastructure/env-config/domain/entities/entity";

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
    super(props, id)
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  update(props: UserPropsUpdate): void {
    this.name = props.name
    this.email = props.email
  }

  updatePassword(value: string): void {
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
}
