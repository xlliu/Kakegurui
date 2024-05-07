
import {Tooltip} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { TonConnectButton, useTonConnectUI, useTonWallet, useTonAddress } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";



export function walletInfo() {
  const [walletInfo, setWalletInfo] = useState(null);
  const userFriendlyAddress = useTonAddress();
  // const { t } = useTranslation();
  // https://toncenter.com/api/v2/getWalletInformation?address=EQACj_54prc6cL6VXR7_-vvIOwefwhmKoLW6Gd6vktXI_Czc
  const url = `https://toncenter.com/api/v2/getWalletInformation?address=${userFriendlyAddress}`;
  
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
        console.log(response.data);
        setWalletInfo(response.data)

      })
      .catch(error => {
        console.error('There was a problem with the axios operation:', error);
      });
    }
    getWB();
    const intervalId = setInterval(getWB, 10000); // 每5秒自动刷新数据
    
    return () => {
      clearInterval(intervalId); // 在组件卸载时清除定时器
    };
  }, [userFriendlyAddress]); // 仅在组件挂载时执行一次
  
  return {
    wInfo: walletInfo
  };
}