import { getProvidersForServer } from "./lib/actions";
import SignIn from "./components/signin";

const SignInPage = async () => {
  const providers = await getProvidersForServer();

  return <SignIn providers={providers} />;
};

export default SignInPage;
