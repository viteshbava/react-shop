import Settings from "../components/Settings/Settings";
import useSetDocumentTitle from "../hooks/use-setDocumentTitle";

const SettingsPage = () => {
  useSetDocumentTitle("React Shop - Settings");
  return <Settings />;
};

export default SettingsPage;
