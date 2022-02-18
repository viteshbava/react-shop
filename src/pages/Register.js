import InfoError, { INFO_ERROR_TYPE } from "../components/Error/InfoError";

const Register = () => {
  return (
    <InfoError
      type={INFO_ERROR_TYPE.INFO}
      heading="Register"
      message="Registration flow not built yet. Sorry!"
    />
  );
};

export default Register;
