
import {Card, CardHeader, CardBody, CardFooter, Divider, Image, Link} from "@nextui-org/react";

export const Top = () => (
<Card className="min-w-[200px]" radius="sm">
  <CardHeader className="flex gap-3 bg-default-100">
    <div className="flex flex-raw justify-between w-[100%]">
      <div className="text-md flex items-end px-1 ">Top</div>
      <div className="text-small text-default-500 flex items-end px-1 ">Win streak</div>
    </div>
  </CardHeader>
  <Divider/>
  <CardBody >
  <div className="space-y-3 ">
    <div className="px-1 h-6 rounded-sm bg-default-100 flex flew-raw justify-between">
      <div className="">ssssyyyy</div>
      <p className="">19</p>
    </div>
    <div className="px-1 h-6 rounded-sm bg-default-100 ">xxxyyy</div>
    <div className="px-1 h-6 rounded-sm bg-default-100 "></div>
  </div>
  </CardBody>
  <Divider/>
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
