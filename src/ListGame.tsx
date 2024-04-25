import {Card} from "@nextui-org/react";

export const ListGame = () => (
    <Card className="flex-1 max-w-[33%] space-y-5 p-4" radius="sm">
    <div className="h-24 rounded-lg bg-default-300"></div>
    <div className="space-y-3">
      <div className="h-24 w-3/5 rounded-lg bg-default-200"></div>
      <div className="h-24 w-4/5 rounded-lg bg-default-200"></div>
      <div className="h-24 w-2/5 rounded-lg bg-default-300"></div>
    </div>
  </Card>
);
