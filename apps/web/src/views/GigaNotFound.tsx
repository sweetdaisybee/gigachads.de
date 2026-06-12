import { GigaBaseView, GigaHomeButton } from "@components/index.js";

export const GigaNotFound: React.FC = () => {
  return(
    <GigaBaseView>
      <div className="h-screen flex justify-center items-center flex-col">
        <span className="bg-gray-300 shadow-sm shadow-black p-4 border-2 border-black rounded-lg">
          404 Not Found
        </span>
        <GigaHomeButton/>
      </div>
    </GigaBaseView>
  );
};
