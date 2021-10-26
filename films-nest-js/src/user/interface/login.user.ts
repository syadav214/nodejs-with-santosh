export interface UserData {
    email: string;
    token: string;
  }
  
  export default interface UserRO {
    user: UserData;
  }