import React from "react";
import {RadioGroup, Radio, cn, Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";
import { Address, toNano, fromNano } from '@ton/core';

export default function App(props) {
  const { joinGameMessage, updateJoinGameMessage,setBet } = props;
  let tabs = [
    {
      id: "100",
      label: "100",
    },
    {
      id: "300",
      label: "300",
    },
    {
      id: "500",
      label: "500",
    },
    {
      id: "3000",
      label: "3k",
    },
    {
      id: "10000",
      label: "10k",
    },
    {
      id: "50000",
      label: "50k",
    },
    {
      id: "100000",
      label: "100k",
    },
  ];

  const [selected, setSelected] = React.useState("100");
  const handleClick = (selected) => {
    console.log('mode选中的值为：', selected);
    setSelected(selected)
    const newMessage = {
      ...joinGameMessage,
      // betAmount: BigInt(parseInt(selected)) // 修改 gameId
      betAmount: toNano(selected)
    };
    setBet(toNano(selected))
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
      // radius="sm"

      >
        {(item) => (
          <Tab key={item.id} title={item.label} />
        )}
      </Tabs>
    </div>  
    </>
    
  );
}
