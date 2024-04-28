import { useEffect, useState } from 'react';
import Counter, { ChangeOwner, Deploy, Fee, Game, GameListActive, GameSafe, JoinGame, StopGame } from '../contracts/kkg';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonConnect } from './useTonConnect';
import { Address, Dictionary, OpenedContract, toNano } from '@ton/core';

export function useCounterContract() {
  const client = useTonClient();
  const [activeRoomCounts, setActiveRoomCounts] = useState<null | String>();
  const [gameListActive, setGameListActive] = useState<GameListActive>();
  const [resultByOne, setResultByOne] = useState<Game>();

  const [balance, setBalance] = useState<Map<Address, bigint>>();
  const [sumBalance, setSumBalance] = useState<string>();

  
  const { sender } = useTonConnect();

  // const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

  const counterContract = useAsyncInitialize(async () => {
    if (!client) return;
    console.log('触发useCounterContract的client 回调打开合约');
    const contract = new Counter(
      // Address.parse('EQAMRK6UZ5QUyjIDoPn2WcrgXWBDODJLxkSbZCYl_ZMF6Ip-') //local
      Address.parse('EQBbfwY86Xk_K4B1YJorNDR8PGWL-UQt_ekqtXldd9vln27N')
      
    );
    return client.open(contract) as OpenedContract<Counter>;
  }, [client]);
  console.log('触发useCounterContract的中代码');
  useEffect(() => {
    async function getValue() {
      if (!counterContract) return;
      const activeRoomCounts = await counterContract.getGamesActiveCounts();
      setActiveRoomCounts(activeRoomCounts.toString());
      const gameListActive = await counterContract.getGameListActive();
      setGameListActive(gameListActive);
      const balance = await counterContract.getBalanceOf();
      // console.log('balance:', balance);
      const bn = new Map(balance)
      setBalance(bn)
      // console.log('bn:', bn);
      const sumbalance = await counterContract.getBalance();
      setSumBalance(sumbalance);
      console.log('触发useCounterContract的counterContract定时 回调');

      // const resultByOne = await counterContract.getGameResultByOne(BigInt(2));
      // setResultByOne(resultByOne);

    //   await sleep(60000); // sleep 5 seconds and poll value again
    //   getValue();
    }
    console.log('触发useCounterContract的counterContract回调');
    getValue();
    // const intervalId = setInterval(getValue, 5000); // 每5秒自动刷新数据
    
    // return () => {
    //   clearInterval(intervalId); // 在组件卸载时清除定时器
    // };
  }, [counterContract]);

  // {
  //   value: toNano('0.05'),
  // },
  // {
  //     $$type: 'Fee',
  //     fee: 10n,
  // }
  

  function sendTx(amount , payload) {
    return counterContract?.send(sender,amount, payload);
  }

  return {
    resultByOne: resultByOne,
    activeRoomCounts: activeRoomCounts,
    gameListActive: gameListActive,
    balance: balance,
    sumBalance:sumBalance,
    address: counterContract?.address.toString(),
    setBalance: setBalance,
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