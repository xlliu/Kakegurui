import { useEffect, useState, useRef  } from 'react';
import Counter, { ChangeOwner, Deploy, Fee, Game, GameListActive, GameSafe, JoinGame, StopGame } from '../contracts/kkg';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonConnect } from './useTonConnect';
import { Address, Dictionary, OpenedContract, toNano } from '@ton/core';

export function useCounterContract() {
  const client = useTonClient();
  const [activeRoomCounts, setActiveRoomCounts] = useState<null | String>();
  const [gamesCounts, setGamesCounts] = useState<null | String>();
  const [gameListActive, setGameListActive] = useState<GameListActive>();

  const [balance, setBalance] = useState<Map<Address, bigint>>();
  const [sumBalance, setSumBalance] = useState<string>();

  
  const { sender } = useTonConnect();

  // const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

  const counterContract = useAsyncInitialize(async () => {
    if (!client) return;
    // console.log('触发Hook的client 回调打开合约');
    const contract = new Counter(
      // Address.parse('EQAMRK6UZ5QUyjIDoPn2WcrgXWBDODJLxkSbZCYl_ZMF6Ip-') //local
      // Address.parse('EQD1ddV64rYt8hb3uOFBfaXWHILSherUXPV994x6Kr1w5uY_') //new version onlion
      // Address.parse('EQBbfwY86Xk_K4B1YJorNDR8PGWL-UQt_ekqtXldd9vln27N') // old version onlionv clear
      // Address.parse('kQBggSEk1WePQLjpp93IrB8lJPnD3n-jD--M6suu0wD4hY9O') //dev
      // Address.parse('EQDyzmFMRbIzjsIsswsLabRByySbOrs8Kesv-X8eLNJGnPpU') 
      Address.parse('EQACj_54prc6cL6VXR7_-vvIOwefwhmKoLW6Gd6vktXI_Czc') //new version onlion
      
      
    );
    return client.open(contract) as OpenedContract<Counter>;
  }, [client]);
  // console.log('触发Hook中的代码片段');

  

  useEffect(() => {
    
    async function getValue() {
      if (!counterContract) return;
      const respAll = await counterContract.getRespAll();
      // console.log('ra:', respAll);
      const balance = respAll.balanceOf
      const activeRoomCounts = respAll.gamesActiveCounts
      const _gameListActive = respAll.gameListActive
      const sumbalance = respAll.balance
      const gamesCounts = respAll.gamesCounts

      setActiveRoomCounts(activeRoomCounts.toString());
      setGameListActive(_gameListActive);
      const bn = new Map(balance)
      setBalance(bn)
      setSumBalance(sumbalance);
      setGamesCounts(gamesCounts.toString())
      // console.log('触发Hook getValue的回调');
    }
    // console.log('触发Hook的回调');
    getValue();
    const intervalId = setInterval(getValue, 8000); // 每5秒自动刷新数据
    
    return () => {
      clearInterval(intervalId); // 在组件卸载时清除定时器
    };
  }, [counterContract]);

  function sendTx(amount , payload) {
    return counterContract?.send(sender,amount, payload);
  }

  return {
    activeRoomCounts: activeRoomCounts,
    gameListActive: gameListActive,
    balance: balance,
    sumBalance:sumBalance,
    address: counterContract?.address.toString(),
    gamesCounts: gamesCounts,
    sendTx: sendTx
  };
}



// import { useEffect, useState } from 'react';
// import Counter from '../contracts/counter';
// import { useTonClient } from './useTonClient';
// import { useAsyncInitialize } from './useAsyncInitialize';
// import { useTonConnect } from './useTonConnect';
// import { Address, OpenedContract } from '@ton/core';

// export function useCounterContract() {
//   const client = useTonClient();
//   const [val, setVal] = useState<null | string>();
//   const { sender } = useTonConnect();

//   const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

//   const counterContract = useAsyncInitialize(async () => {
//     if (!client) return;
//     const contract = new Counter(
//       Address.parse('EQBYLTm4nsvoqJRvs_L-IGNKwWs5RKe19HBK_lFadf19FUfb') // replace with your address from tutorial 2 step 8
//     );
//     return client.open(contract) as OpenedContract<Counter>;
//   }, [client]);

//   useEffect(() => {
//     async function getValue() {
//       if (!counterContract) return;
//       setVal(null);
//       const val = await counterContract.getCounter();
//       setVal(val.toString());
//       await sleep(5000); // sleep 5 seconds and poll value again
//       getValue();
//     }
//     getValue();
//   }, [counterContract]);

//   return {
//     value: val,
//     address: counterContract?.address.toString(),
//     sendIncrement: () => {
//       return counterContract?.sendIncrement(sender);
//     },
//   };
// }