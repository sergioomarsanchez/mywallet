import { getProvidersForServer } from "src/app/lib/actions";
import SignIn from "src/app/components/signin";

const SignInPage = async () => {
  const providers = await getProvidersForServer();

  return <SignIn providers={providers} />;
};

export default SignInPage;
