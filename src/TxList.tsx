
import {Tooltip} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { TonConnectButton, useTonConnectUI, useTonWallet, useTonAddress } from "@tonconnect/ui-react";
import { useEffect, useState, useCallback } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Progress, Textarea, Link  } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, getKeyValue, User, AvatarGroup, Avatar } from "@nextui-org/react";
import { toNano, fromNano } from '@ton/core';
// import  TonWeb  from "tonweb";


// export default function Top(props) {
export default function TxList(props) {
  const { t, wallet, addr_args, userFriendlyAddress  } = props;
  // const [tx, setTx] = useState();
  const [transactions, setTransactions] = useState([]);
  const [addrMap, setAddrMap] = useState();

  const urlTx = "https://toncenter.com/api/v3/transactions?account=EQACj_54prc6cL6VXR7_-vvIOwefwhmKoLW6Gd6vktXI_Czc&limit=15";
  useEffect(() => {
    function getWB() {
      axios.get(urlTx, {
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': '6cda0934e83bf49807ae65817dab80318ba494aa734fbcc923d607d930a2db61'
        }
      })
      .then(response => {
        // setTx(response.data);
        console.log("tx!!.transactions", response.data)
        setTransactions(response.data.transactions);
        setAddrMap(response.data.address_book);
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
  }, [transactions]); // 仅在组件挂载时执行一次
  
  
  const renderCell = useCallback((row, columnKey) => {
    // loading.onClose();
    // console.log('refush data')
    const cellValue = row[columnKey];
    switch (columnKey) {
      case "value":
        return (
          <div className="flex  flex-row items-center justify-center">
            {row.in_msg.opcode == "0x00000000" ? 
              row.out_msgs && Number(fromNano(row.out_msgs[0].value)).toFixed(2) : row.in_msg && fromNano(row.in_msg.value)
            }
          </div>
        );
      case "opcode":
        return (
          <div className="flex  flex-row items-center justify-center">
            {row.in_msg.opcode == "0x00000000" ? t("Withdraw"): t("Join Game")}
          </div>
        );
      case "now":
        return (
          <div className="flex  flex-row items-center justify-center">
          {/* <p>
            在: 
          </p> */}
          <Chip className="capitalize" variant="flat" size="sm">
              {new Date(cellValue*1000).toLocaleString()}
            </Chip>
          </div>

        );
      case "hash":
        return (
          <div className="flex flex-row items-center justify-center">

            <Link
              isExternal
              // showAnchorIcon
              href={"https://tonscan.org/tx/" + cellValue}
              className="text-small"
            >
              {cellValue.slice(0,6)+ ".."}
            </Link>
          </div>
        );
      case "account":
        return (
          // <div className="flex flex-col">
          //   <p className="text-bold text-xs capitalize">{row.win_addr ? row.win_addr.toString(addr_args).slice(-4) : ""} </p>
          //   {/* <p className="text-bold text-sm capitalize text-default-400">Winer</p> */}
          // </div>
          <div className="flex flex-row items-center justify-center">
          <p>
            {addrMap && addrMap[row.in_msg.source].user_friendly.slice(-4)}
          </p>
          
          {/* <Avatar
            name={addrMap && addrMap[row.in_msg.source].user_friendly.slice(-4)}
            isDisabled={false}
            isBordered ={true}
            // icon={row.player2 ? resMap[(row.player2).choice.toString()] : <AvatarIcon />}
            radius="sm"
            color={addrMap && addrMap[row.in_msg.source].user_friendly == userFriendlyAddress ? "warning" : "default"}
          /> */}
          </div>
          
        );
      default:
        return cellValue;
    }
  }, [transactions]);
  
  // useEffect(() => {
  //   if (!tx) return;
    
  // }, [tx]);

  const columns_tx = [
    {
      key: "account",
      label: "User Addr",
    },
    // {
    //   key: "description",
    //   label: "description",
    // },
    // {
    //   key: "in_msg",
    //   label: "in_msg",
    // },
    {
      key: "now",
      label: "Time",
    },
    {
      key: "opcode",
      label: "Active",
    },
    {
      key: "value",
      label: "value",
    },
    {
      key: "hash",
      label: "Tx Hash",
    },

  ];

  return (
    <Card className="min-w-[350px] font-zqh h-[753px]" radius="sm">
      <CardHeader className="flex gap-3 bg-default-100">
        <div className="flex flex-raw justify-between w-[100%]">
          <div className="text-md flex items-end px-1 ">{t("Game Records")}</div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody  className="p-0">
        <Table
          color="warning"
          selectionMode="single"
          // defaultSelectedKeys={[selected.toString()]}
          aria-label="Example static collection table"
          radius="sm"
          fullWidth
          hideHeader
          
        >
          <TableHeader columns={columns_tx} className="flex bg-default-100">
            {(column: { key: any; label: any; }) =>
              <TableColumn key={column.key} >
                {column.label}
              </TableColumn>}
          </TableHeader>
          <TableBody items={transactions} emptyContent={<Progress
              size="sm"
              isIndeterminate
              aria-label="Waiting for the blockchain to return data..."
              className="max-w-md"
            />}>
            {(item) => (
              <TableRow key={item.hash}>
                {(columnKey: any) => <TableCell className='px-1' >{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}

          </TableBody>
        </Table>
      </CardBody>
      <Divider />
      <CardFooter className="flex flex-raw justify-end">
        <Link
          isExternal
          showAnchorIcon
          href="https://tonscan.org"
        >
          {t("tonscan.org")}
        </Link>
      </CardFooter>
    </Card>
  );
}