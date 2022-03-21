import Register from "../components/Register/Register";
import useSetDocumentTitle from "../hooks/use-setDocumentTitle";

const RegisterPage = () => {
  useSetDocumentTitle("React Shop - Register");
  return <Register />;
};

export default RegisterPage;
