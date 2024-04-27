import React from "react";
import { RadioGroup, Radio, cn } from "@nextui-org/react";
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
      <RadioGroup
        color="warning"
        label=""
        description="Block confirmation takes about 30 seconds, please be patient."
        // defaultValue="1"
        onValueChange={handleClick}
        value={selected}
      >
        <CustomRadio value="1" className="">
          {/* Rock */}
          <FontAwesomeIcon icon={faHandBackFist} className="px-3" />

        </CustomRadio>
        <CustomRadio
          // description="Scissors"
          value="2"
        // className="bg-sc bg-cover bg-center w-64 h-64 bg-red-500 bg-opacity-50"
        >
          {/* Scissors  */}
          <FontAwesomeIcon icon={faHandScissors} className="px-3" />
        </CustomRadio>
        <CustomRadio value="3" className="">
          {/* <div className=" bg-paper bg-cover bg-contain"> */}
          {/* Paper */}
          {/* </div> */}
          <FontAwesomeIcon icon={faHand} className="px-3" />
        </CustomRadio>
        

      </RadioGroup>
    </>

  );
}
