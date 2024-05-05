import { gql } from "@apollo/client";

export const POST_USER = gql`
  mutation CreateUser($createUserInput: UserInput) {
    createUser(input: $createUserInput) {
      username
      token
    }
  }
`;

export const AUTOLOGIN = gql`
  mutation AutoLogin($token: String) {
    autoLogin(token: $token) {
      _id
      username
    }
  }
`;

export const LOGIN = gql`
  mutation Login($loginInput: UserInput) {
    login(input: $loginInput) {
      _id
      token
      username
    }
  }
`;
