export default class UserDTO {
  constructor(user) {
      this.id = user._id
      this.full_name = `${user.first_name} ${user.last_name}`
      this.email=user.email
      this.age = user.age
      this.cart = user.cart
      this.role = user.role
  }
}

export class UserPrincipalDTO {
  constructor(user) {
      this.id = user._id
      this.full_name = `${user.first_name} ${user.last_name}`
      this.email=user.email    
      this.role = user.role
  }
}