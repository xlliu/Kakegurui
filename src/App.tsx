// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import '@twa-dev/sdk';
import React from 'react'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, Spacer, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";
// import { TonConnectButton, useTonWallet, useTonConnectUI } from '@tonconnect/ui-react';
import { TonConnectButton, useTonConnectUI, useTonWallet, useTonAddress } from "@tonconnect/ui-react";
import { useTonConnect } from './hooks/useTonConnect';
import { useCounterContract } from './hooks/useCounterContract';

import ChoiceRSP from './ChoiceRSP';
import ChoiceAmount from './ChoiceAmount';
import ChoiceMode from './ChoiceMode';
// import ChoiceRSP  from './ChoiceRSP';
import { ListGame } from "./ListGame";
import Top from "./Top";
import { AcmeLogo } from "./AcmeLogo";
import { Tip } from "./Tip";

import { Address, toNano, fromNano } from '@ton/core';
import { columns, init_datas, init_datas_dict } from "./data";
import './App.css'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, getKeyValue, Radio, RadioGroup } from "@nextui-org/react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, User } from "@nextui-org/react";

import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";
import { JoinGame, Player, StopGame } from './contracts/kkg';

import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/react";
import { FaRegHandRock, FaRegHandPaper, FaRegHandScissors } from 'react-icons/fa';
import { BiMoneyWithdraw } from "react-icons/bi";
import { Progress } from "@nextui-org/react";
import '@twa-dev/sdk';


import { useTranslation } from "react-i18next";

const statusColorMap = {
  3: "success",
  2: "warning",
  1: "warning",
  0: "warning", 

};

const statusValueMap = {
  3: "Success", //完成
  2: "Tie", //平局
  1: "Waiting", //等待对手
  0: "Available", //空闲
};

const resMap = {
  "3": <FaRegHandPaper />, //完成
  "2": <FaRegHandScissors />, //平局
  "1": <FaRegHandRock />, //等待对手
  "0": <AvatarIcon />, //空闲
};

const addr_args = { urlSafe: true, bounceable: false, testOnly: true }

function App() {
  const { t } = useTranslation();
  // const [count, setCount] = useState(0)
  const { connected } = useTonConnect();
  const wallet = useTonWallet();
  const [tonConnectUi] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();

  console.log("useTonAddress!", userFriendlyAddress);

  const { resultByOne, activeRoomCounts, gameListActive, balance, address, sendTx, setBalance, sumBalance } = useCounterContract();
  const colors = ["default", "primary", "secondary", "success", "warning", "danger"];
  const [selectedColor, setSelectedColor] = React.useState("default");

  // const map2 = new Map(Object.entries(init_datas_dict));
  // let datas = map2.values()
  let datas  = [];
  let bn = ""
  const get_map = new Map(gameListActive);
  if (get_map.size != 0) {
    let myObject = Object.fromEntries(get_map);
    console.log('myObject:', myObject);
    const newMessage = {
      ...init_datas_dict,
      ...myObject // 修改 gameId
    };
    const map2 = new Map(Object.entries(newMessage));
    datas = map2.values()
    console.log('datas:', datas);
  }

  if (wallet) {
    const newMap = new Map();

    balance?.forEach((value, key) => {
      // 在这里进行键的转换操作，假设将键转换为大写形式
      const newKey = key.toString(addr_args);
      // 将转换后的键值对添加到新的 Map 中
      newMap.set(newKey, value);
    });
    bn = newMap.get(userFriendlyAddress);
  }



  const renderCell = React.useCallback((row, columnKey) => {
    const cellValue = row[columnKey];
    switch (columnKey) {
      case "currentBetAmount":
        return (
          <div className="flex flex-row space-x-3 items-center justify-start">
            <User
              avatarProps={{ src: "./ton.svg" }}
              description="Toncoin"
              name={Number(fromNano(cellValue)).toLocaleString()}
            ></User>
          </div>
        );
      case "player1":
        return (
          <AvatarGroup isBordered>
            <Avatar
              isDisabled={row.player1 ? false : true}
              isBordered ={row.player1 ? true : false}
              icon={row.player1 ? resMap[(row.player1).choice.toString()] : <AvatarIcon />}
              radius="sm"
              color={row.player1 ? (row.player1.addr.toString(addr_args) == userFriendlyAddress ? "warning" : "default") : "default"}
            />
            <Avatar
              isDisabled={row.player2 ? false : true}
              isBordered ={row.player2 ? true : false}
              icon={row.player2 ? resMap[(row.player2).choice.toString()] : <AvatarIcon />}
              radius="sm"
              color={row.player2 ? (row.player2.addr.toString(addr_args) == userFriendlyAddress ? "warning" : "default") : "default"}
            />
          </AvatarGroup>

        );
      case "status":
        return (
          <div>
            <Chip className="capitalize" variant="flat" color={statusColorMap[Number(row.status)]} size="sm">
              {t(statusValueMap[Number(cellValue)])}
            </Chip>
          </div>
        );
      case "count":
        return (
          // <div className="flex flex-col">
          //   <p className="text-bold text-xs capitalize">{row.win_addr ? row.win_addr.toString(addr_args).slice(-4) : ""} </p>
          //   {/* <p className="text-bold text-sm capitalize text-default-400">Winer</p> */}
          // </div>
          <Avatar
            name={row.win_addr ? row.win_addr.toString(addr_args).slice(-4) : ""}
            isDisabled={row.win_addr ? false : true}
            isBordered ={row.win_addr ? true : false}
            // icon={row.player2 ? resMap[(row.player2).choice.toString()] : <AvatarIcon />}
            radius="sm"
            color={row.win_addr ? (row.win_addr.toString(addr_args) == userFriendlyAddress ? "warning" : "default") : "default"}
          />
        );
      default:
        return cellValue;
    }
  }, [gameListActive]);



  const stopGameMessage: StopGame = {
    $$type: 'StopGame',
    gameId: BigInt(12345)
  };

  const [bet, setBet] = React.useState(toNano('1'));

  let sendAmount = {
    value: bet,
  }

  let sendWithdraw = {
    value: toNano('0.05'),
  }

  let jg: JoinGame = {
    $$type: 'JoinGame',
    gameId: BigInt(1),
    move: BigInt(1),
    count: BigInt(1),
    betAmount: bet,
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
  const handleJoinClick = (sendAmount, joinGameMessage, onClose) => {

    sendTx(sendAmount, joinGameMessage);
    onClose();

  };

  const showForm = () => {
    console.log('joinGameMessage!', joinGameMessage);
    console.log('sendAmount!', sendAmount);
  };
  return (
    <>
      <header className="mx-auto dark text-foreground bg-background">
        <div className="flex items-start justify-between">
          <Navbar isBordered maxWidth="2xl" className="flex items-start ">
            <NavbarContent justify="start" >
              <NavbarBrand className="mr-4">
                <AcmeLogo />
                <p className="hidden sm:block font-bold text-inherit">{t("Kakegurui")}</p>
              </NavbarBrand>
            </NavbarContent>
            <NavbarContent as="div" className="items-center" justify="end">

              <div className='flex flex-col' >
                <p className='text-xs font-bold'>{t("Withdraw")}</p>
                <div className='flex flex-row items-center justify-between'>
                  <div >
                    {bn != null ? fromNano(bn) : '0'}
                  </div>
                  <button onClick={() => sendTx(sendWithdraw, "Withdraw")}>
                    <BiMoneyWithdraw />
                  </button>

                </div>

              </div>
              {/* <div className='flex flex-col' >
                <b>sumBalance</b>
                <div className='flex flex-row items-center justify-between'>
                  <div >
                    {sumBalance ?? '...'}
                  </div>
                  <button onClick={() => sendTx(sendWithdraw, "withdraw safe")}>
                    <BiMoneyWithdraw />
                  </button>

                </div>

              </div> */}


              <div>
                <TonConnectButton />
              </div>
            </NavbarContent>
          </Navbar>
        </div>
      </header>

      <main className="dark text-foreground bg-background md:h-screen">
        <div className='container mx-auto space-y-4'>
          <div className='flex flex-col md:flex-row '>
            <div className='md:w-2/3 rounded-sm p-3'>
              <Card className="" radius="sm">
                <CardHeader className="flex gap-3 bg-default-100">
                  <div className="flex flex-raw justify-between w-[100%]">
                    <div className="text-md flex items-end px-1 ">{t("Active Room")} {activeRoomCounts}</div>
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
                    defaultSelectedKeys={[selected.toString()]}
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
                    <TableBody items={datas} emptyContent={"Waiting for the blockchain to return data."}>
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
                  {/* <Button color="primary" onPress={handleRowClick} className="rounded-sm px-3">
                  {t("Creat Room")}
                  </Button> */}
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
                <ModalHeader className="flex flex-col gap-2">{t("Room Number")} {selected.toString()} </ModalHeader>
                <ModalBody className="flex flex-col gap-2">
                  <div className="flex-1 w-full ">
                    <ChoiceMode joinGameMessage={joinGameMessage} updateJoinGameMessage={updateJoinGameMessage} />

                  </div>
                  <div className="flex-2 w-full">
                    <ChoiceAmount joinGameMessage={joinGameMessage} updateJoinGameMessage={updateJoinGameMessage} setBet={setBet} />

                  </div>
                  <div className="flex-3 w-full " >
                    <ChoiceRSP joinGameMessage={joinGameMessage} updateJoinGameMessage={updateJoinGameMessage} />

                  </div>
                </ModalBody>

                <ModalFooter>
                  {/* <Progress
                    hidden
                    size="sm"
                    isIndeterminate
                    aria-label="Loading..."
                    label="The table will be refreshed after the block is confirmed, please wait"
                    className="max-w-md"
                  /> */}
                  <Button color="danger" variant="flat" onPress={onClose}>
                    {t("Close")}
                  </Button>
                  {/* <Button color="primary" onPress={onClose}>
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
                  </Button> */}
                  {/* <Button color="primary" onPress={showForm}>
                    {t("showForm")}
                  </Button> */}
                  {wallet ? (
                    // <Button onClick={() => tonConnectUi.sendTransaction(tx)}>
                    <Button onClick={() => handleJoinClick(sendAmount, joinGameMessage,onClose)} color="primary">
                      {get_map.get(selected) ? 
                        ((get_map.get(selected)!!.status == 2 || get_map.get(selected)!!.status == 3) ? t("Reset and Join Game"):t("Join Game"))
                        :t("Join Game")
                      }
                    </Button>
                  ) : (
                    <Button onClick={() => tonConnectUi.openModal()}>
                      {t("Connect Wallet")}
                    </Button>
                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </main>
      <footer className='flex items-start justify-center dark text-foreground bg-background'>
        <p>&copy; {t("2024. Kakegurui Built on the Ton blockchain.")}</p>
      </footer>


    </>
  )
}

export default App
