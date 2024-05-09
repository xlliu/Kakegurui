import React from "react";
import { RadioGroup, Radio, cn,Image, Tabs,Tab,Spacer  } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faHandBackFist, faHand, faHandScissors } from '@fortawesome/free-solid-svg-icons';


export const CustomRadio = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        // wrapper: "hidden",
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between ",
          "flex-row-reverse max-w-[100%] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-warning"
        ),
      }}
    >
      {children}
    </Radio>
  );
};

export const CustomTab = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Tab
      {...otherProps}
      classNames={{
        // wrapper: "hidden",
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between ",
          "flex-row-reverse max-w-[100%] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-warning"
        ),
      }}
    >
      {children}
    </Tab>
  );
};

export default function App(props) {
  const { joinGameMessage, updateJoinGameMessage } = props;
  const [selected, setSelected] = React.useState("1");
  const handleClick = (selected) => {
    console.log('RSP选中的值为：', selected);
    setSelected(selected)
    const newMessage = {
      ...joinGameMessage,
      move: BigInt(parseInt(selected)) // 修改 gameId
    };
    updateJoinGameMessage(newMessage);

  };
  return (
    <>
    <div className="flex flex-col" >
    <Tabs 
      aria-label="Options" 
      color="warning" 
      // onValueChange={handleClick}
      // value={selected}
      selectedKey={selected}
      disableAnimation={true}
      onSelectionChange={handleClick}
      variant="solid"
      size="auto"
      classNames={{
        tabList: "flex gap-auto w-full  bg-rsp bg-cover bg-center",
        // cursor: "w-full ",
        tab: "h-auto",
        tabContent: "group-data-[selected=true]:text-[#06b6d4]"
      }}
      // className="flex w-full"
      >
      <Tab
        className="w-1/3 backdrop-blur-sm"
        key="1"
        title={
          // <div className="flex items-center space-x-2">
            <Image
              isZoomed
              width={80}
              loading="eager"
              shadow="lg"
              alt="NextUI Fruit Image with Zoom"
              src="/Picture1.png"
            />
          // </div>
        }
      />
      <Tab
        className="w-1/3 backdrop-blur-sm"
        key="2"
        title={
          <Image
          isBlurred
              isZoomed
              width={80}
              loading="eager"
              shadow="lg"
              alt="NextUI Fruit Image with Zoom"
              src="/Picture2.png"
            />
        }
      />
      <Tab
        className="w-1/3 backdrop-blur-sm"
        key="3"
        title={
          <Image
              isBlurred
              isZoomed
              width={80}
              loading="eager"
              shadow="lg"
              alt="NextUI Fruit Image with Zoom"
              src="/Picture3.png"
            />
        }
      />
    </Tabs>
  </div>  
      {/* <RadioGroup
        color="warning"
        label=""
        description="Block confirmation takes about 30 seconds, please be patient."
        // defaultValue="1"
        onValueChange={handleClick}
        value={selected}
      >
        <CustomRadio value="1" className="">
            <Image
              isZoomed
              width={60}
              loading="eager"
              shadow="lg"
              alt="NextUI Fruit Image with Zoom"
              src="/Picture1.png"
            />
        </CustomRadio>
        <CustomRadio
          // description="Scissors"
          value="2"
          className=""
        >
          <Image
          isBlurred
              isZoomed
              width={60}
              loading="eager"
              shadow="lg"
              alt="NextUI Fruit Image with Zoom"
              src="/Picture2.png"
            />
        </CustomRadio>
        <CustomRadio value="3"className="">
        <Image
              isZoomed
              isBlurred
              shadow="lg"
              loading="eager"
              width={60}
              removeWrapper={true}
              alt="NextUI Fruit Image with Zoom"
              src="/Picture3.png"
              // className="m-1"
            ></Image>
        </CustomRadio>
        

      </RadioGroup> */}
    </>

  );
}
