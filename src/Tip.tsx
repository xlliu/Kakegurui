
import {Tooltip} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';



export const Tip = () => (
    <Tooltip key="warning" color="warning" content={
        <div className="px-1 py-2">
          <div className="text-small font-bold">Game Introduction</div>
          <div className="text-tiny">Single game: Play a game</div>
          <div className="text-tiny">Successive games: Play multiple games</div>
          <div className="text-tiny">Deathmatch: Play multiple games，Unable to give up halfway</div>
          <div className="text-tiny">Life or death: Play multiple games，The final game determines the outcome</div>
        </div>
      } className="capitalize">
          <FontAwesomeIcon icon={faCircleQuestion} />
    </Tooltip>
);
