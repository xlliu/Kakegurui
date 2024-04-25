import React from "react";
import { Address, toNano, fromNano } from '@ton/core';
// const columns = [
//   {name: "NAME", uid: "name"},
//   {name: "ROLE", uid: "role"},
//   {name: "STATUS", uid: "status"},
//   {name: "ACTIONS", uid: "actions"},
// ];
// roomId
// betAmount
// currentBetAmount
// player1
// status
// finish
// current_count
// count
const columns = [
    {
        key: "roomId",
        label: "Room",
    },
    
    {
        key: "currentBetAmount",
        label: "BetAmount",
      },
    // {
    //   key: "current_count",
    //   label: "current_count",
    // },
    
    {
      key: "count",
      label: "Round",
    },
    // {
    //   key: "finish",
    //   label: "finish",
    // },
    {
      key: "status",
      label: "Status",
    },
    // {
    //   key: "win_last_addr",
    //   label: "win_last_addr",
    // }
    {
        key: "player1",
        label: "Players",
      },
  ];


const init_datas_dict = {
    1n : {
      roomId: "1",
      currentBetAmount: toNano("100"),
      player1: null,
      status: 0n,
      count: 1n,
      current_count: 0n,
    },
    2n : {
      roomId: "2",
      currentBetAmount: toNano("300"),
      player1: null,
      status: 0n,
      count: 1n,
      current_count: 0n,
    },
    3n : {
      roomId: "3",
      currentBetAmount: toNano("500"),
      player1: null,
      status: 0n,
      count: 1n,
      current_count: 0n,
    },
    4n : {
      roomId: "4",
      currentBetAmount: toNano("1000"),
      player1: null,
      status: 0n,
      count: 1n,
      current_count: 0n,
    },
    5n : {
      roomId: "5",
      currentBetAmount: toNano("5000"),
      player1: null,
      status: 0n,
      count: 1n,
      current_count: 0n,
    }
};
//   let init_datas_dict = new Map(Object.entries(_init_datas_dict));
const init_datas = [
  {
    roomId: "1",
    currentBetAmount: toNano("100"),
    player1: null,
    status: 0n,
    count: 1n,
    current_count: 0n,
  },
  {
    roomId: "2",
    currentBetAmount: toNano("300"),
    player1: null,
    status: 0n,
    count: 1n,
    current_count: 0n,
  },
  {
    roomId: "3",
    currentBetAmount: toNano("500"),
    player1: null,
    status: 0n,
    count: 1n,
    current_count: 0n,
  },
  {
    roomId: "4",
    currentBetAmount: toNano("1000"),
    player1: null,
    status: 0n,
    count: 1n,
    current_count: 0n,
  },
  {
    roomId: "5",
    currentBetAmount: toNano("5000"),
    player1: null,
    status: 0n,
    count: 1n,
    current_count: 0n,
  },
];


export {columns, init_datas, init_datas_dict};
