
import {Tooltip} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

import { useTranslation } from "react-i18next";



export default function Tip(props) {
  const { t } = useTranslation();
  return (
    <Tooltip key="warning" color="warning" content={
        <div className="px-1 py-2">
          <div className="text-small font-bold">{t("Game Introduction")}</div>
          <div className="text-tiny">{t("Single Game")}: {t("Play a game, the winner will get the bonus, and if there is a draw, the bet amount after deducting handling fees and gas fees will be refunded.")}</div>
          {/* <div className="text-tiny">Successive games: Play multiple games</div>
          <div className="text-tiny">Deathmatch: Play multiple games，Unable to give up halfway</div>
          <div className="text-tiny">Life or death: Play multiple games，The final game determines the outcome</div> */}
        </div>
      } className="capitalize">
          <FontAwesomeIcon icon={faCircleQuestion} />
    </Tooltip>
  );
}