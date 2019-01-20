export class ProfileRegistered {
  public firstName: string;
  public lastName: string;
  public password: string;
  public company: any;

  constructor(firstName, lastName, password, company) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.company = company;
  }
}
