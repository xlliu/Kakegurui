
import {Tooltip} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { TonConnectButton, useTonConnectUI, useTonWallet, useTonAddress } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";



export function walletInfo(userFriendlyAddress) {
  const [walletInfo, setWalletInfo] = useState(null);
  const [tx, setTx] = useState(null);
  // const userFriendlyAddress = useTonAddress();
  // const { t } = useTranslation();
  // https://toncenter.com/api/v2/getWalletInformation?address=EQACj_54prc6cL6VXR7_-vvIOwefwhmKoLW6Gd6vktXI_Czc
  const url = `https://toncenter.com/api/v2/getWalletInformation?address=${userFriendlyAddress}`;
  const urlTx = "https://toncenter.com/api/v3/transactions?account=EQACj_54prc6cL6VXR7_-vvIOwefwhmKoLW6Gd6vktXI_Czc&limit=15";
  useEffect(() => {
    
    async function getWB() {
      if (!userFriendlyAddress) return;
      
      console.log(url)
      axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        setWalletInfo(response.data)

      })
      .catch(error => {
        console.error('There was a problem with the axios operation:', error);
      });
    }
    async function getTx() {
      if (!userFriendlyAddress) return;
      axios.get(urlTx, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        console.log(response.data);
        setTx(response.data)

      })
      .catch(error => {
        console.error('There was a problem with the axios operation:', error);
      });
    }
    getWB();
    getTx();
    console.log("xxy")
    const _getWB = setInterval(getWB, 10000); // 每5秒自动刷新数据
    const _getTx = setInterval(getTx, 15000); // 每5秒自动刷新数据
    return () => {
      clearInterval(_getWB); 
      clearInterval(_getTx); 
    };
  }, [userFriendlyAddress]); // 仅在组件挂载时执行一次
  
  return {
    wInfo: walletInfo
  };
}