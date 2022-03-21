import { useEffect } from "react";

const useSetDocumentTitle = (defaultPageTitle, dynamicPageTitle) => {
  useEffect(() => {
    const defaultAppTitle = "React Shop";
    if (dynamicPageTitle) {
      document.title = dynamicPageTitle;
    } else document.title = defaultPageTitle;
    return () => (document.title = defaultAppTitle);
  }, [defaultPageTitle, dynamicPageTitle]);
};

export default useSetDocumentTitle;
