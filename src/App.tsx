// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import '@twa-dev/sdk';
import React from 'react'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, Spacer, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, AvatarGroup } from "@nextui-org/react";
import { TonConnectButton, useTonWallet, useTonConnectUI } from '@tonconnect/ui-react';
// import {TonConnectButton, useTonConnectUI, useTonWallet, useTonAddress} from "@tonconnect/ui-react";
import { useTonConnect } from './hooks/useTonConnect';
import { useCounterContract } from './hooks/useCounterContract';

import ChoiceRSP from './ChoiceRSP';
import ChoiceAmount from './ChoiceAmount';
import ChoiceMode from './ChoiceMode';
// import ChoiceRSP  from './ChoiceRSP';
import { ListGame } from "./ListGame";
import { Top } from "./Top";
import { AcmeLogo } from "./AcmeLogo";
import { Tip } from "./Tip";

import { Address, toNano, fromNano } from '@ton/core';
import { columns,init_datas, init_datas_dict } from "./data";
import './App.css'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, getKeyValue, Radio, RadioGroup } from "@nextui-org/react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, User } from "@nextui-org/react";

import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";
import { JoinGame, StopGame } from './contracts/kkg';
const statusColorMap = {
  3n: "success",
  2n: "warning",
  1n: "warning",
  0n: "danger",

};

const statusValueMap = {
  3n: "Restart", //完成
  2n: "Tie", //平局
  1n: "Waiting", //等待对手
  0n: "Idle", //空闲
};

function App() {
  // const [count, setCount] = useState(0)
  const { connected } = useTonConnect();
  const wallet = useTonWallet();
  const [tonConnectUi] = useTonConnectUI();

  const { resultByOne, activeRoomCounts, gameListActive, balance, address, sendTx } = useCounterContract();
  const colors = ["default", "primary", "secondary", "success", "warning", "danger"];
  const [selectedColor, setSelectedColor] = React.useState("default");


  // const map = new Map(gameListActive);
  // const map = new Map(Object.entries(init_datas_dict));
  // const [datas, setDatas] = React.useState(map.values());
  // const datas = map.values();
  // setDatas(map.values());
  const get_map = new Map(gameListActive);
  console.log('外层newM:', get_map);
  let myObject = Object.fromEntries(get_map);
  const newMessage = {
    ...init_datas_dict,
    ...myObject // 修改 gameId
  };
  
  // const newM = new Map(newMessage);
  // console.log('转换后的 Map 对象:', map);
  console.log('newM:', get_map);
  console.log('myObject:', myObject);
  console.log('newMessage:', newMessage);
  const map2 = new Map(Object.entries(newMessage));
  // setDatas(map2.values());
  const datas = map2.values()


  // React.useEffect(() => {
  //   async function getDatas() {
  //     if (!get_map) return;
  //     let myObject = Object.fromEntries(get_map);
  //     const newMessage = {
  //       ...init_datas_dict,
  //       ...myObject // 修改 gameId
  //     };
      
  //     // const newM = new Map(newMessage);
  //     console.log('转换后的 Map 对象:', map);
  //     console.log('newM:', get_map);
  //     console.log('myObject:', myObject);
  //     console.log('newMessage:', newMessage);
  //     const map2 = new Map(Object.entries(newMessage));
  //     setDatas(map2.values());
  //   }
  //   getDatas();
  // }, []);
  
  // if (map.values().size > 0){
    
  // }
  

  // 输出转换后的 Map 对象
  // console.log('转换后的 Map 对象:', map);
  // console.log('转换后的 Map 对象:', map.values());
  // console.log('转换后的 Map 对象:', map);

  // const rows = [
  //   {
  //     "$$type": "GameSafe",
  //   "betAmount": 50000000n,
  //   "count": 1n,
  //   "currentBetAmount": 50000000n,
  //   "current_count": 1n,
  //   "finish": false,
  //   "lose_addr": null,
  //   "lose_stop": false,
  //   "choice": 0n,
  //   "ready": true,
  //   "player2": null,
  //   "roomId": 1n,
  //   "status": 1n,
  //   "win_addr": null,
  //   "win_last_addr": null
  //   }
  // ]


  const renderCell = React.useCallback((row, columnKey) => {
    const cellValue = row[columnKey];

    console.log('columnKey!', columnKey);

    switch (columnKey) {
      case "roomId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue.toString()}</p>
            {/* <p className="text-bold text-sm capitalize text-default-400">{user.team}</p> */}
          </div>
        );
      case "currentBetAmount":
        return (
          <div className="flex flex-row space-x-3 items-center justify-start">
              <Image
              width={25}
              alt=""
              src="./ton.svg"
            />
            <p className=""><strong>{fromNano(cellValue)}</strong></p>
            {/* <p className="text-bold text-sm capitalize text-default-400">TonCoin</p> */}
          </div>
        );
      case "player1":
        return (
          <AvatarGroup isBordered>
            <Avatar
              name={row.player1 ? row.player1?.addr.toString().slice(-4) : ""}
              isDisabled={row.player1 ? false : true}
              // classNames={{
              //   base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
              //   icon: "text-black/80",
              // }}
            />
            <Avatar
              name={row.player2 ? row.player2?.addr.toString().slice(-4) : ""}
              isDisabled={row.player2 ? false : true}
              // classNames={row.player2 ? false : true}
            />
          </AvatarGroup>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[row.status]} size="sm" variant="flat">
            {statusValueMap[cellValue]}
          </Chip>
        );
      case "count":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{row.win_addr ? row.win_addr.toString().slice(-4) : ""} </p>
            {/* <p className="text-bold text-sm capitalize text-default-400">{user.team}</p> */}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);



  const stopGameMessage: StopGame = {
    $$type: 'StopGame',
    gameId: BigInt(12345)
  };

  let sendAmount = {
    value: toNano('0.05'),
  }

  let jg: JoinGame = {
    $$type: 'JoinGame',
    gameId: BigInt(1),
    move: BigInt(1),
    count: BigInt(1),
    betAmount: BigInt(toNano('0.05')),
  }

  const [joinGameMessage, setJoinGameMessage] = React.useState(jg);

  // 定义一个函数用于更新父组件变量
  const updateJoinGameMessage = (newMessage: any) => {
    console.log('1111!', newMessage);
    setJoinGameMessage(newMessage);
  };
  const [selected, setSelected] = React.useState(1n);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleRowClick = (selected: React.SetStateAction<bigint>) => {
    console.log('Row clicked!', selected);
    setSelected(selected)
    const newMessage = {
      ...joinGameMessage,
      gameId: BigInt(selected) // 修改 gameId
    };
    updateJoinGameMessage(newMessage);
    onOpen()

  };

  const showForm = () => {
    console.log('Row clicked!', joinGameMessage);
  };
  return (
    <>
      <header className="mx-auto dark text-foreground bg-background">
        <div className="flex items-start justify-between">
          <Navbar className="flex items-start ">
            <NavbarContent justify="start">
              <NavbarBrand className="mr-4">
                <AcmeLogo />
                <p className="hidden sm:block font-bold text-inherit">ACME</p>
              </NavbarBrand>
              <NavbarContent className="hidden sm:flex gap-3">
                <NavbarItem>
                  <Link color="foreground" href="#">
                    Features
                  </Link>
                </NavbarItem>
                <NavbarItem isActive>
                  <Link href="#" aria-current="page" color="secondary">
                    Customers
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link color="foreground" href="#">
                    Integrations
                  </Link>
                </NavbarItem>
              </NavbarContent>
            </NavbarContent>
            <NavbarContent as="div" className="items-center" justify="end">
              <div className='Card'>
                <b>Balance</b>
                <div>{balance ?? 'Loading...'}</div>
              </div>
              <div>
                <TonConnectButton />
              </div>
            </NavbarContent>
          </Navbar>
        </div>
      </header>

      <main className="dark text-foreground bg-background">
        <div className='container mx-auto h-screen space-y-4'>
          <div className='flex flex-col md:flex-row '>
            <div className='md:w-2/3 rounded-sm p-3'>
              <Card className="" radius="sm">
                <CardHeader className="flex gap-3 bg-default-100">
                  <div className="flex flex-raw justify-between w-[100%]">
                    <div className="text-md flex items-end px-1 ">Active Room {activeRoomCounts}</div>
                    <div className="text-small text-default-500 flex items-center px-1 ">
                      <Tip />
                    </div>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="p-0">
                  <Table
                    color="warning"
                    selectionMode="single"
                    defaultSelectedKeys={[selected]}
                    aria-label="Example static collection table"
                    radius="sm"
                    fullWidth
                    hideHeader
                  >
                    <TableHeader columns={columns}>
                      {(column: { key: any; label: any; }) =>
                        <TableColumn key={column.key} >
                          {column.label}
                        </TableColumn>}
                    </TableHeader>
                    <TableBody items={datas}>
                      {(item: { roomId: React.SetStateAction<bigint> }) => (
                        <TableRow key={item.roomId}>
                          {(columnKey: any) => <TableCell onClick={() => handleRowClick(item.roomId)}>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                      )}

                    </TableBody>
                  </Table>
                </CardBody>
                <Divider />
                <CardFooter className="flex flex-raw justify-end">
                  <i className="fa-solid fa-user"></i>
                  <i className="z-index fas fa-coffee"></i>
                  <Button color="primary" onPress={handleRowClick} className="rounded-sm px-3">
                    Creat Room
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className='md:w-1/3 rounded-sm p-3'>
              <Top />
            </div>
          </div>
          {/* <ListGame />
      <DetailsGame /> */}
          {/* <br />
       <div>
          <TonConnectButton />
        </div>
        <div>
          <b>Counter Address</b>
          <div className='Hint'>{address?.slice(0, 30) + '...'}</div>
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{value ?? 'Loading...'}</div>
        </div>
        <a
          className={`${connected ? 'Active' : 'Disabled'}`}
          onClick={() => {
            sendTx();
          }}
        >
          sendTx
        </a> */}
        </div>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className='dark text-foreground bg-background'
          scrollBehavior="inside"
          size='xl'
        >
          <ModalContent>
            {(onClose: any) => (
              <>
                <ModalHeader className="flex flex-col gap-2">Room Number {selected.toString()} </ModalHeader>
                <ModalBody className="flex flex-col gap-2">
                  <div className="flex-1 w-full ">
                    <ChoiceMode joinGameMessage={joinGameMessage} updateJoinGameMessage={updateJoinGameMessage} />

                  </div>
                  <div className="flex-2 w-full">
                    <ChoiceAmount joinGameMessage={joinGameMessage} updateJoinGameMessage={updateJoinGameMessage} />

                  </div>
                  <div className="flex-3 w-full " >
                    <ChoiceRSP joinGameMessage={joinGameMessage} updateJoinGameMessage={updateJoinGameMessage} />

                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Join Game
                  </Button>
                  <Button color="primary" onPress={showForm}>
                    showForm
                  </Button>
                  <Button
                    className={`${connected ? 'Active' : 'Disabled'}`}
                    onPress={() => {
                      sendTx(sendAmount, joinGameMessage);
                      onClose();
                    }}
                  // color="primary"
                  >
                    sendTx
                  </Button>
                  {wallet ? (
                    // <Button onClick={() => tonConnectUi.sendTransaction(tx)}>
                    <Button onClick={() => sendTx(sendAmount, joinGameMessage)}>
                      Join Game
                    </Button>
                  ) : (
                    <Button onClick={() => tonConnectUi.openModal()}>
                      Join Game
                    </Button>
                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </main>
      <footer className='flex items-start justify-center dark text-foreground bg-background'>
        <p>&copy; 2024. All rights reserved.</p>
      </footer>


    </>
  )
}

export default App
