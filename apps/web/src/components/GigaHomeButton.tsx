import { Link } from "react-router-dom";

export const GigaHomeButton: React.FC = () => {
  return(
    <div className="p-8">
      <Link 
        to={"/"}
        className="bg-gray-300 shadow-sm shadow-black p-4 border-2 border-black rounded-lg cursor-pointer hover:bg-gray-200">
        Zurück zur Startseite
      </Link>
    </div>
  );
};
