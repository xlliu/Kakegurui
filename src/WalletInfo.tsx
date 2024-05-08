
import {Tooltip} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect, useState } from "react";

// import  TonWeb  from "tonweb";

export function walletInfo(userFriendlyAddress,wallet) {
  // const { t} = props;
  const [walletInfo, setWalletInfo] = useState(null);
  // const userFriendlyAddress = useTonAddress();
  // const { t } = useTranslation();
  // https://toncenter.com/api/v2/getWalletInformation?address=EQACj_54prc6cL6VXR7_-vvIOwefwhmKoLW6Gd6vktXI_Czc
  const url = `https://toncenter.com/api/v2/getWalletInformation?address=${userFriendlyAddress}`;
  useEffect(() => {
    function getWB() {
      if (!wallet) return;
      // const balance = await tonweb.getBalance(userFriendlyAddress);
      // const tx = await tonweb.getTransactions("EQACj_54prc6cL6VXR7_-vvIOwefwhmKoLW6Gd6vktXI_Czc", 15)
      // console.log("zzy", Number(balance), tx)
      
      axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': '6cda0934e83bf49807ae65817dab80318ba494aa734fbcc923d607d930a2db61'
        }
      })
      .then(response => {
        // console.log("balance",response.data)
        setWalletInfo(response.data)
        
      })
      .catch(error => {
        console.error('There was a problem with the axios operation:', error);
      });

      if (!wallet) {
        clearInterval(_getWB); 
      };
      
    }
    const _getWB = setInterval(getWB, 5000); // 每5秒自动刷新数据
    return () => {
      clearInterval(_getWB); 
    };
  }, [wallet]); // 仅在组件挂载时执行一次
  
  return {
    wInfo: walletInfo
  };
}