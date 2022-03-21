import About from "../components/About/About";
import useSetDocumentTitle from "../hooks/use-setDocumentTitle";

const AboutPage = () => {
  useSetDocumentTitle("About");
  return <About />;
};

export default AboutPage;
