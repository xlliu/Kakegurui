import React from 'react'

import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import { TonConnectButton, useTonConnectUI, useTonWallet, useTonAddress } from "@tonconnect/ui-react";
import { useCounterContract } from './hooks/useCounterContract';
import axios from 'axios';

import ChoiceRSP from './ChoiceRSP.jsx';
import ChoiceAmount from './ChoiceAmount.jsx';
import ChoiceMode from './ChoiceMode.jsx';
import Top from "./Top";
import Tg from "./Tg";
import TxList from "./TxList";
import { walletInfo } from './WalletInfo';
import { AcmeLogo } from "./AcmeLogo";
import { CircularProgress } from "@nextui-org/react";

import { toNano, fromNano } from '@ton/core';
import { columns, init_datas_dict } from "./data";
import './App.css'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, getKeyValue } from "@nextui-org/react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, User } from "@nextui-org/react";

import { Card, CardHeader, CardBody, CardFooter, Divider, Progress } from "@nextui-org/react";
import { JoinGame } from './contracts/kkg';
import { Popover, PopoverTrigger, PopoverContent,Image } from "@nextui-org/react";

import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/react";
import { FaRegHandRock, FaRegHandPaper, FaRegHandScissors } from 'react-icons/fa';
import { BiMoneyWithdraw } from "react-icons/bi";
import '@twa-dev/sdk';


import { useTranslation } from "react-i18next";

const statusColorMap = {
  3: "success",
  2: "success",
  1: "warning",
  0: "Default",

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

const resMapS = {
  "3": "📰",
  "2": "✂️",
  "1": "🗿",
  "0": "❔",
};


const resMapIMG = {
  "3": "/Picture3.png" , 
  "2": "/Picture2.png" , 
  "1": "/Picture1.png", 
  "0": "", 
};


// const addr_args = { urlSafe: true, bounceable: false, testOnly: true };
const addr_args = { urlSafe: true, bounceable: false, testOnly: false };

function App() {
  const { t } = useTranslation();
  const wallet = useTonWallet();
  const [tonConnectUi] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const { wInfo } = walletInfo(userFriendlyAddress, wallet);

  const { activeRoomCounts, gameListActive, balance, sendTx, gamesCounts, sumBalance } = useCounterContract();



  

  // React.useEffect(() => {
	// 	tonConnectUi.onStatusChange(async w => {
	// 		if (!w) {
  //       console.log("w 不存在 返回")
	// 			return;
	// 		}
  //     // console.log("TUi w Status", w.connectItems);
	// 		// if (w.connectItems?.tonProof && 'proof' in w.connectItems.tonProof) {
  //     //   console.log("w 存在", w.connectItems.tonProof.proof, w.account)
	// 		// }

	// 	}
      
  // )}, [tonConnectUi]);


  // const map2 = new Map(Object.entries(init_datas_dict));
  // let datas = map2.values()
  // let datas  = [];
  const [datas, setDatas] = React.useState([]);
  const get_map = new Map(gameListActive);
  React.useEffect(() => {
    if (get_map.size != 0) {
      let myObject = Object.fromEntries(get_map);
      const newMessage = {
        ...init_datas_dict,
        ...myObject // 修改 gameId
      };
      const map2 = new Map(Object.entries(newMessage));
      const map3 = Array.from(map2.values());
      // console.log(map3);
      setDatas(map3);
      // console.log('触发datas的回调的更新数据');
    }
    // console.log('触发datas的回调');
  }, [gameListActive]);

  // let bn = ""
  const [bn, setBn] = React.useState(0);

  const urlRealtime = "https://ga4-realtime-cr7e3hbmcq-uc.a.run.app/realtime"

  const [realtime, setRealtime] = React.useState(null);
  React.useEffect(() => {
    const getRealtime = () => {
      axios.get(urlRealtime, {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
      .then(response => {
        setRealtime(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was a problem with the axios operation:', error);
      });
    }
    const _getRealtime = setInterval(getRealtime, 3000); // 每5秒自动刷新数据
    return () => {
      clearInterval(_getRealtime); 
    };
  }, [realtime]);

  React.useEffect(() => {
    if (wallet) {
      const newMap = new Map();
  
      balance?.forEach((value, key) => {
        // 在这里进行键的转换操作，假设将键转换为大写形式
        const newKey = key.toString(addr_args);
        // 将转换后的键值对添加到新的 Map 中
        newMap.set(newKey, value);
        // console.log(newKey, value);
      });
      let _bn = newMap.get(userFriendlyAddress);
      setBn(_bn);
    }
      
  }, [balance]);




  const renderCell = React.useCallback((row, columnKey) => {
    // loading.onClose();
    // console.log('refush data')
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
              imgProps={{
                alt: "User Avatar",
                className: "p-2",
              }}
              src={row.player1 ? resMapIMG[(row.player1).choice.toString()] : ''}
              color={row.player1 ? (row.player1.addr.toString(addr_args) == userFriendlyAddress ? "warning" : "default") : "default"}
            />
            <Avatar
              // name={row.player2 ? resMapS[(row.player2).choice.toString()] : ''}
              isDisabled={row.player2 ? false : true}
              isBordered={row.player2 ? true : false}
              // icon={row.player2 ? resMap[(row.player2).choice.toString()] : <AvatarIcon />}
              imgProps={{
                alt: "User Avatar",
                className: "p-2",
              }}
              // radius="sm"
              src={row.player2 ? resMapIMG[(row.player2).choice.toString()] : ''}

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
            isBordered={row.win_addr ? true : false}
            // icon={row.player2 ? resMap[(row.player2).choice.toString()] : <AvatarIcon />}
            radius="sm"
            color={row.win_addr ? (row.win_addr.toString(addr_args) == userFriendlyAddress ? "warning" : "default") : "default"}
          />
        );
      default:
        return cellValue;
    }
  }, [gameListActive]);

  const [bet, setBet] = React.useState();

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
    setJoinGameMessage(newMessage);
  };
  const [selected, setSelected] = React.useState(1n);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleRowClick = (row) => {
    setBet(row.currentBetAmount);
    setSelected(row.roomId);
    const newMessage = {
      ...joinGameMessage,
      gameId: BigInt(row.roomId), // 修改 gameId
      betAmount: BigInt(row.currentBetAmount),
      move: BigInt(1)
    };
    updateJoinGameMessage(newMessage);
    onOpen()

  };

  return (
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
        <TableBody items={datas} emptyContent={<Progress
          size="sm"
          isIndeterminate
          aria-label="Waiting for the blockchain to return data..."
          className="max-w"
        />}>
          {(item: { roomId: React.SetStateAction<bigint> }) => (
            <TableRow key={item.roomId}>
              {(columnKey: any) => <TableCell className='px-1' onClick={() => handleRowClick(item)}>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}

        </TableBody>
      </Table>
  )
}

export default App
