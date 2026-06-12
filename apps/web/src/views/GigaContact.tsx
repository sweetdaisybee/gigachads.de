import { GigaBaseView, GigaHomeButton } from "@components/index.js";

export const GigaContact: React.FC = () => {
  return(
    <GigaBaseView>
      <div className="relative h-screen justify-center flex flex-col items-center p-8">
        <div className="p-8 bg-gray-300 flex flex-col items-center rounded-2xl border-2 border-black shadow-black shadow-sm">
          <span className="text-6xl mb-8">Kontakt</span>
          <a className="text-blue-700 text-2xl underline" href="mailto:contact@gigachads.de">contact@gigachads.de</a>
        </div>
        <GigaHomeButton/>
      </div>
    </GigaBaseView>
  );
};
