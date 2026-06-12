import { Link } from "react-router-dom";

interface gigaLink {
  uuid: string;
  destination: string;
  text: string;
};

const links: gigaLink[] = [
  {
    uuid: "d48eda9c-119e-4553-95db-566d4500d34a",
    destination: "/sponsors",
    text: "Sponsoren ❤️"
  },
  {
    uuid: "24c9882e-5d0c-4fbf-b0a5-0e53e84d1ed5",
    destination: "/social",
    text: "Soziale Medien 📺"
  },
  {
    uuid: "85d50a24-a7f9-4e57-b7fe-184273c7389a",
    destination: "/contact",
    text: "Kontakt ✉️"
  }
];

export const GigaFooter: React.FC = () => {
  return(
    <nav className="relative p-4 flex flex-col w-full">
      {links.map(((link: gigaLink) => {
        return (
          <Link
            key={link.uuid}
            to={link.destination}
            className="p-2 bg-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer mt-2 w-full text-center">
            {link.text}
          </Link>
        );
      }))}
    </nav>
  );
};
