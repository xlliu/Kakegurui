
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Link } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";


export default function Top(props) {
  const { t } = props;
  return (
    <Card className="min-w-[200px] font-zqh" radius="sm">
      <CardHeader className="flex gap-3 bg-default-100">
        <div className="flex flex-raw justify-between w-[100%]">
          <div className="text-md flex items-end px-1 ">{t("Tip")}</div>
          {/* <div className="text-small text-default-500 flex items-end px-1 ">Win streak</div> */}
        </div>
      </CardHeader>
      <Divider />
      <CardBody >
        <div className="space-y-3 ">
          <Textarea
            isDisabled
            label=""
            labelPlacement="outside"
            // placeholder="Enter your description"
            defaultValue={t("1. This game is completely deployed on the Ton blockchain. The data on the chain is safe and transparent, ensuring game fairness.")}
            className="max-w"
          />
          <Textarea
            isDisabled
            label=""
            labelPlacement="outside"
            // placeholder="Enter your description"
            defaultValue={t("2. The delay in Ton block confirmation speed, the normal delay is about 30 seconds. Please wait for the list data to be refreshed after joining the game. Please do not join the game again.")}
            className="max-w"
          />
          <Textarea
            isDisabled
            label=""
            labelPlacement="outside"
            // placeholder="Enter your description"
            defaultValue={t("3. The high cost of blockchain data storage, after a single game is completed, the game results will be cached in the list until new players join the game, the room will be automatically reset and a new game will be started.")}
            className="max-w"
          />
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="flex flex-raw justify-end">
        <Link
          isExternal
          showAnchorIcon
          href="https://t.me/jeerclub"
        >
          {t("Playing By Telegram.")}
        </Link>
      </CardFooter>
    </Card>
  );
}