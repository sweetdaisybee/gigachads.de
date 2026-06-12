import imgGigaChad from "@assets/images/gigachad.webp"
import { useEffect, useState } from "react";
import { tSharedPlacement, tSharedTeam } from "@gigachads.de/shared/schemas/v1"
import { getTeamWithPlacements } from "@servicesV1/index.js";
import { GigaFooter, GigaBaseView } from "@components/index.js";

export const GigaHome: React.FC = () => {
  const [team, setTeam] = useState<tSharedTeam>({
    uuid: "4975a642-fdef-405d-b3c6-594750bd4dea",
    quattId: 334,
    name: "Giga Chads",
    placements: [{
      uuid: "4975a642-fdef-405d-b3c6-594750bd4dea",
      rank: 1
    }]
  });

  useEffect(() => {
    const getData = async () => {
      setTeam(await getTeamWithPlacements(334));
    };
    getData()
  }, [])

  return(
    <GigaBaseView>
      <div className="relative justify-center flex p-8">
        <div className="flex flex-col w-full sm:w-3/10 items-center">
          <img className="w-full h-full" src={imgGigaChad} alt="gigachad" />
          <span className="text-6xl mt-2 mb-2 p-1 font-bold">{team.name}</span>
          <span>Platzierungen</span>
          <hr className="text-black w-11/12"/>
          <ul className="p-4 font-bold text-2xl">
            {team.placements?.map((placement: tSharedPlacement) => {
              return <li key={placement.uuid}>{`QuattFo ${placement.year?.name}: ${placement.rank}`}</li>
            })}
          </ul>
          <hr className="text-black w-11/12"/>
          <GigaFooter/>
        </div>
      </div>
    </GigaBaseView>
  );
};