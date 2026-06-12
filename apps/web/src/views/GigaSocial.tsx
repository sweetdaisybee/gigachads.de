import imgYoutube from "@assets/images/youtube.webp"
import imgInstagram from "@assets/images/instagram.webp"
import imgQuattFo from "@assets/images/quattfo.webp"
import imgGitHub from "@assets/images/github.webp"
import { GigaHomeButton, GigaBaseView } from "@components/index.js";

interface gigaSocial {
  uuid: string;
  type: string;
  text: string;
  destination: string;
  image: React.ImgHTMLAttributes<HTMLImageElement>["src"];
  imageAlt: string;
};

const gigaSocials: gigaSocial[] = [
  {
    uuid: "9fd70750-2eda-481f-ac9e-cc5574af4feb",
    type: "YouTube",
    text: "Offiziele Hymne",
    destination: "https://www.youtube.com/watch?v=AnwNuH497RE",
    image: imgYoutube,
    imageAlt: "youtube"
  },
    {
    uuid: "88b0ae78-cb0d-41ca-83bf-7610fcd546ea",
    type: "Instagram",
    text: "Folge uns auf Instagram!",
    destination: "https://www.instagram.com/giga.chads2022/",
    image: imgInstagram,
    imageAlt: "instagram"
  },
  {
    uuid: "e45b7375-1347-445f-bac8-ac708616dec8",
    type: "QuattFo",
    text: "Live die Spiele verfolgen",
    destination: "https://www.quattfo.de/",
    image: imgQuattFo,
    imageAlt: "quattfo"
  },
  {
    uuid: "01f47959-a2c7-4ef5-8ac7-1d60707859a4",
    type: "GitHub",
    text: "Open-Source Code",
    destination: "https://github.com/sweetdaisybee/gigachads.de",
    image: imgGitHub,
    imageAlt: "github"
  }
];

export const GigaSocial: React.FC = () => {
  return(
    <GigaBaseView>
      <div className="relative h-screen justify-center flex flex-col items-center p-8">
        <ul className="p-8 relative flex flex-col bg-gray-300 rounded-lg shadow-sm shadow-black border-2 border-black sm:w-1/4 w-7/8">
          {gigaSocials.map(((social: gigaSocial) => {
            return (
              <li key={social.uuid} className="flex w-full flex-row items-center mt-1 mb-1">
                <a className="flex items-center w-full" href={social.destination} aria-label={social.text}>
                  <div className="w-24 h-24 flex items-center justify-center shrink-0 mr-4">
                    <img className="w-full" src={social.image} alt={social.imageAlt}/>
                  </div>
                  <div className="flex justify-center flex-col">
                    <p className="text-xl">{social.type}</p>
                    <p className="text-md">{social.text}</p>
                  </div>
                </a>
              </li>
            );
          }))}
        </ul>
        <GigaHomeButton/>
      </div>
    </GigaBaseView>
  );
};
