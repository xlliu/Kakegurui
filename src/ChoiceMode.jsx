import React from "react";
import {RadioGroup, Radio, cn,Textarea, Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";
import {Tooltip, Button} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { Tip } from "./Tip";

export default function App(props) {
  const { joinGameMessage, updateJoinGameMessage } = props;

  const [selected, setSelected] = React.useState("1");
  let tabs = [
    {
      id: "1",
      label: "Single Game",
      content: "Play a game."
    },
    {
      id: "2",
      label: "Successive",
      content: "Play multiple games."
    },
    {
      id: "3",
      label: "Deathmatch",
      content: "Play multiple games，Unable to give up halfway"
    },
    {
      id: "4",
      label: "Life or death",
      content: "Play multiple games，The final game determines the outcome."
    }
  ];

  const handleClick = (selected) => {
    console.log('mode选中的值为：', selected);
    setSelected(selected)
    const newMessage = {
      ...joinGameMessage,
      gameId: BigInt(parseInt(selected)) // 修改 gameId
    };
    updateJoinGameMessage(newMessage);
  };
    

  return (
    <>
    <div className="flex w-full flex-col">
      <Tabs 
      aria-label="Dynamic tabs" 
      items={tabs} 
      // size="sm"
      selectedKey={selected}
      onSelectionChange={handleClick}
      color="warning"
      radius="sm"
      // placement="bottom"
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <Textarea
            isDisabled
            label="Description"
            placeholder={item.content}
          />
          </Tab>
        )}
      </Tabs>
    </div>  
    </>
    
  );
}
