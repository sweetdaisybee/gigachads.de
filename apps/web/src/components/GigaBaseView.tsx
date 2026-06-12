import { useImagePreloader } from "@hooks/preload.js";
import imgYoutube from "@assets/images/youtube.webp"
import imgInstagram from "@assets/images/instagram.webp"
import imgQuattFo from "@assets/images/quattfo.webp"
import imgGitHub from "@assets/images/github.webp"

interface propsGigaBaseView {
  children: React.ReactNode;
};

export const GigaBaseView: React.FC<propsGigaBaseView> = (
  props: propsGigaBaseView
) => {
  const { imagesPreloaded } = useImagePreloader([imgYoutube, imgInstagram, imgQuattFo, imgGitHub])
  if (!imagesPreloaded) {
    return <p>Preloading ...</p>
  }
  return(
    <>
      {props.children}
    </>
  );
};
