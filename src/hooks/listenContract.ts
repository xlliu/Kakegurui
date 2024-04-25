import { useEffect, useState } from 'react';
import Counter, { ChangeOwner, Deploy, Fee, Game, GameListActive, GameSafe, JoinGame, StopGame } from '../contracts/kkg';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonConnect } from './useTonConnect';
import { Address, Dictionary, OpenedContract, toNano } from '@ton/core';


const listenContract = () => {
  // const client = useTonClient();
  // const [activeRoomCounts, setActiveRoomCounts] = useState<null | String>();
  // const [gameListActive, setGameListActive] = useState<GameListActive>();
  // const [resultByOne, setResultByOne] = useState<Game>();

  // const [balance, setBalance] = useState<null | String>();

  
  // const { sender } = useTonConnect();
  
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const client = useTonClient();
    const contractAddress = 'EQChWEcT5WkCiWgnD9Z2QzqECWsBvOC-Gz_YMSN2slK8ZxAq'; // 合约地址
    const subscription = client.net.subscribe({
      type: 'messages',
      filter: {
        src: { eq: contractAddress },
      },
      result: 'id',
    });

    subscription.on('data', (event: any) => {
      console.log('Contract event received:', event);
      setEvents((prevEvents: any) => [...prevEvents, event]);
    });

    subscription.on('error', (error: any) => {
      console.error('Subscription error:', error);
    });

    // return () => {
    //   subscription.unsubscribe();
    //   tonClient.close();
    // };
  }, []);

  return (
    <div>
      <h2>Contract Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{JSON.stringify(event)}</li>
        ))}
      </ul>
    </div>
  );
};

export default listenContract;
  // const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

  // const counterContract = useAsyncInitialize(async () => {
  //   if (!client) return;
  //   const contract = new Counter(
  //   //   Address.parse('EQBYLTm4nsvoqJRvs_L-IGNKwWs5RKe19HBK_lFadf19FUfb') // replace with your address from tutorial 2 step 8
  //     Address.parse('EQChWEcT5WkCiWgnD9Z2QzqECWsBvOC-Gz_YMSN2slK8ZxAq')
  //   );
  //   return client.open(contract) as OpenedContract<Counter>;
  // }, [client]);

  // useEffect(() => {
  //   async function getValue() {
  //     if (!counterContract) return;
  //     setActiveRoomCounts(null);
  //     const activeRoomCounts = await counterContract.getGamesActiveCounts();
  //     setActiveRoomCounts(activeRoomCounts.toString());
  //     const gameListActive = await counterContract.getGameListActive();
  //     setGameListActive(gameListActive);
  //     const balance = await counterContract.getBalance();
  //     setBalance(balance.toString());
  //     // const resultByOne = await counterContract.getGameResultByOne(BigInt(2));
  //     // setResultByOne(resultByOne);

  //   //   await sleep(60000); // sleep 5 seconds and poll value again
  //   //   getValue();
  //   }
  //   getValue();
  // }, [counterContract]);

  // {
  //   value: toNano('0.05'),
  // },
  // {
  //     $$type: 'Fee',
  //     fee: 10n,
  // }
  

  // function sendTx(amount:  { value: bigint, bounce?: boolean| null | undefined } , payload: StopGame | Fee | 'ResetGame' | 'ResetBalances' | JoinGame | Deploy | ChangeOwner) {
  //   return counterContract?.send(sender,amount, payload);
  // }

  // return {
  //   resultByOne: resultByOne,
  //   activeRoomCounts: activeRoomCounts,
  //   gameListActive: gameListActive,
  //   balance: balance,
  //   address: counterContract?.address.toString(),
  //   sendTx: sendTx
  // };
// }



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