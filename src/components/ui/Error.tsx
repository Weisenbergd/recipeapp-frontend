import { ApolloError } from "@apollo/client";

interface Props {
  error: ApolloError | undefined;
}

const Error = (props: Props) => {
  return props.error && <p>{props.error.message}</p>;
};
export default Error;
