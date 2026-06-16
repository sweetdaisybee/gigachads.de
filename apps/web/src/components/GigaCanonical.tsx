import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export const GigaCanonical: React.FC = () => {
  const location = useLocation();
  const canonicalUrl = `https://gigachads.de${location.pathname}`
  return(
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};
