
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Link } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { useTranslation } from "react-i18next";



export default function Top(props) {
  const { t } = useTranslation();
  return (
    <Card className="min-w-[200px]" radius="sm">
      <CardHeader className="flex gap-3 bg-default-100">
        <div className="flex flex-raw justify-between w-[100%]">
          <div className="text-md flex items-end px-1 ">{t("Tip")}</div>
          {/* <div className="text-small text-default-500 flex items-end px-1 ">Win streak</div> */}
        </div>
      </CardHeader>
      <Divider />
      <CardBody >
        <div className="space-y-3 ">
          {/* <div className="px-1 h-6 rounded-sm bg-default-100 flex flew-raw justify-between"> */}
          {/* <div className="px-1  rounded-sm bg-default-100 flex flew-raw justify-between">
      <div className="">1. This game is completely deployed on the Ton blockchain. The data on the chain is safe and transparent, ensuring game fairness.</div>
      <p className="">19</p>
    </div>
    <div className="px-1  rounded-sm bg-default-100 ">2. Due to the delay in Ton block confirmation speed, the normal delay is about 30 seconds. Please wait for the list data to be refreshed after joining the game. Please do not join the game again.</div>
    <div className="px-1  rounded-sm bg-default-100 ">3. Due to the high cost of blockchain data storage, after a single game is completed, the game results will be cached in the list until new players join the game, the room will be automatically reset and a new game will be started.</div> */}
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
            defaultValue={t("2. the delay in Ton block confirmation speed, the normal delay is about 30 seconds. Please wait for the list data to be refreshed after joining the game. Please do not join the game again.")}
            className="max-w"
          />
          <Textarea
            isDisabled
            label=""
            labelPlacement="outside"
            // placeholder="Enter your description"
            defaultValue={t("3. the high cost of blockchain data storage, after a single game is completed, the game results will be cached in the list until new players join the game, the room will be automatically reset and a new game will be started.")}
            className="max-w"
          />
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          isExternal
          isBlock
          isDisabled
          color="foreground"
          href=""
        >
          Be wild; that is how to clear the river.
        </Link>
      </CardFooter>
    </Card>
  );
}