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

  const [balance, setBalance] = useState<null | String>();

  
  const { sender } = useTonConnect();

  // const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

  const counterContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Counter(
    //   Address.parse('EQBYLTm4nsvoqJRvs_L-IGNKwWs5RKe19HBK_lFadf19FUfb') // replace with your address from tutorial 2 step 8
      // Address.parse('EQDwBh00WyfnEhMTzeBDSPaM4GTV2gGvxwuW0QQ7nht2Em36')
      
      // Address.parse('EQDfZCQvsFzOEYZbe22e6YXNSg3QQVWMuvxTkaegSw5ivpsR')
      // Address.parse('EQDKDyiHmE1FyFk96B8Ilxav4hRQ3cyesWFgj_zvd-BNVGTs')
      Address.parse('EQDGvCNHc1UvRR3QtItn9GiPtb2UEeW9QbqbTP55HE24c4wL')
      
      
    );
    return client.open(contract) as OpenedContract<Counter>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!counterContract) return;
      const activeRoomCounts = await counterContract.getGamesActiveCounts();
      setActiveRoomCounts(activeRoomCounts.toString());
      const gameListActive = await counterContract.getGameListActive();
      setGameListActive(gameListActive);
      const balance = await counterContract.getBalance();
      setBalance(balance.toString());
      console.log('触发useCounterContract的counterContract定时 回调');

      // const resultByOne = await counterContract.getGameResultByOne(BigInt(2));
      // setResultByOne(resultByOne);

    //   await sleep(60000); // sleep 5 seconds and poll value again
    //   getValue();
    }
    console.log('触发useCounterContract的counterContract回调');
    getValue();
    const intervalId = setInterval(getValue, 30000); // 每5秒自动刷新数据
    
    return () => {
      clearInterval(intervalId); // 在组件卸载时清除定时器
    };
  }, [counterContract]);

  // {
  //   value: toNano('0.05'),
  // },
  // {
  //     $$type: 'Fee',
  //     fee: 10n,
  // }
  

  function sendTx(amount:  { value: bigint, bounce?: boolean| null | undefined } , payload: StopGame | Fee | 'ResetGame' | 'ResetBalances' | JoinGame | Deploy | ChangeOwner) {
    return counterContract?.send(sender,amount, payload);
  }

  return {
    resultByOne: resultByOne,
    activeRoomCounts: activeRoomCounts,
    gameListActive: gameListActive,
    balance: balance,
    address: counterContract?.address.toString(),
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