import { GigaHomeButton, GigaBaseView } from "@components/index.js";
import { tSponsor } from "@gigachads.de/shared/schemas/v1";
import { getAllSponsors } from "@servicesV1/sponsors.js";
import { useEffect, useState } from "react";

export const GigaSponsors: React.FC = () => {
  const [sponsors, setSponsors] = useState<tSponsor[]>([]);

  const getData = async () => {
    setSponsors(await getAllSponsors());
  };

  useEffect(() => {
    getData();
  }, [])

  return(
    <GigaBaseView>
      <div className="relative h-screen justify-center flex flex-col items-center p-8">
        <ul className="relative flex flex-col rounded-lg sm:w3/10">
          {sponsors.map(((sponsor: tSponsor) => {
            return (
              <li key={sponsor.uuid} className="flex w-full flex-col items-center mb-4 border-2 bg-gray-300 shadow-sm shadow-black border-black rounded-2xl">
                <a className="flex flex-col items-center justify-center w-full h-full p-4" href={sponsor.uri} aria-label={sponsor.name}>
                  <span className="text-lg">{sponsor.name}</span>
                  <span className="text-lg">{sponsor.emoji}</span>
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