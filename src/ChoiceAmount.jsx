import React from "react";
import {RadioGroup, Radio, cn, Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";
import { Address, toNano, fromNano } from '@ton/core';

export default function App(props) {
  const { joinGameMessage, updateJoinGameMessage,bet, setBet } = props;
  let tabs = [
    {
      id: toNano("20"),
      label: "20 Ton",
    },
    {
      id: toNano("100"),
      label: "100 Ton",
    },
    {
      id: toNano("300"),
      label: "300",
    },
    {
      id: toNano("500"),
      label: "500",
    },
    {
      id: toNano("1000"),
      label: "1k",
    },
    {
      id: toNano("3000"),
      label: "3k",
    },
    {
      id: toNano("10000"),
      label: "10k",
    },
    {
      id: toNano("50000"),
      label: "50k",
    },
    {
      id: toNano("100000"),
      label: "100k",
    },
  ];

  const [selected, setSelected] = React.useState(bet.toString());
  const handleClick = (selected) => {
    setSelected(selected)
    const newMessage = {
      ...joinGameMessage,
      betAmount: BigInt(selected)
    };
    // console.log("newMessage", newMessage);
    setBet(BigInt(selected))
    updateJoinGameMessage(newMessage);
  };


  return (
    <>
    <div className="flex w-full flex-col">
      <Tabs 
      isDisabled
      aria-label="Dynamic tabs" 
      items={tabs} 
      selectedKey={selected}
      onSelectionChange={handleClick}
      defaultSelectedKey={selected}
      color="warning"
      >
        {(item) => (
          <Tab key={item.id} title={item.label} />
        )}
      </Tabs>
    </div>  
    </>
    
  );
}
