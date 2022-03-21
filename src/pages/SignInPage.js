import SignIn from "../components/Signin/SignIn";
import useSetDocumentTitle from "../hooks/use-setDocumentTitle";

const SignInPage = () => {
  useSetDocumentTitle("React Shop - Sign in");
  return <SignIn />;
};

export default SignInPage;
