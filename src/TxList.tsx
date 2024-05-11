import axios from 'axios';
import { useEffect, useState, useCallback } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Progress, Textarea, Link  } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, getKeyValue, User, AvatarGroup, Avatar } from "@nextui-org/react";
import { toNano, fromNano } from '@ton/core';
// import  TonWeb  from "tonweb";
// import { BetaAnalyticsDataClient } from '@google-analytics/data';
// import { GoogleAuth } from 'google-auth-library';

// export default function Top(props) {
export default function TxList(props) {
  const { t, wallet, addr_args, userFriendlyAddress  } = props;
  // const [tx, setTx] = useState();
  const [transactions, setTransactions] = useState([]);
  const [addrMap, setAddrMap] = useState();
  const [onlineUsers, setOnlineUsers] = useState(null);

  

  const urlTx = "https://toncenter.com/api/v3/transactions?account=EQACj_54prc6cL6VXR7_-vvIOwefwhmKoLW6Gd6vktXI_Czc&limit=15";
  useEffect(() => {
    function getWB() {
      axios.get(urlTx, {
        headers: {
          'Content-Type': 'application/json',
          // 'X-Api-Key': '6cda0934e83bf49807ae65817dab80318ba494aa734fbcc923d607d930a2db61'
          'X-Api-Key': 'b83f9697c49a89e3992fcf5364fc241fb4c159ff14518a85678b079fec1173d7'
        }
      })
      .then(response => {
        // setTx(response.data);
        // console.log("tx!!.transactions", response.data)
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
    const _getWB = setInterval(getWB, 10000); // 每5秒自动刷新数据
    return () => {
      clearInterval(_getWB); 
    };
  }, [transactions]); // 仅在组件挂载时执行一次

  useEffect(() => {
    const propertyId = '438524009'
    // const ga4 = {
    //   "type": "service_account",
    //   "project_id": "quickstart-1715370391597",
    //   "private_key_id": "90e9c2def5e81482333327bcdbf880b16335cc5f",
    //   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCuGCEL8iTMU+Vm\nZiqWXNzsQ3vmLOjsvdM5w/vipJmXtCyLitgmrDZXt+GBfTIPq5OCXGisJ9LQNDeW\nUd1IVuVFQZI6DGfbGdWObjhWrmul6r9KCaiuDr8QUojmF5MdULdDcklZWIOCLTFc\n3shZtnqxk/PeeS5pIYLVVxMCDmuLsSGg1E2WP8HtSqJBURGbnoNZIVnKTU0qud8T\naJTiLof4JOrQSVM5Roe29UOBu6C5LMq4f6NpxD9Bzcj3Zwf3GMfSeUc4crqfBXB3\nK5PL8Ssr9QOqj8O1Uesh3dXAx63pEk6eR3507yFVAQ9evoroCeZOllFLxRwc9tCC\nS6CzmZchAgMBAAECggEAB8SfWt1Z230l2AEYht+LYwZq1Z0s4n1g2qu+RkFichSx\nxSMznFwkS5sylnjL3kuhWBh/+iiHvU8LKOurtEHeVo4DtI/fpXTcZM/RtzpuprdY\nBDl0m5mgWF3aamvkXlM+7iVAFRrAOXODR5nQNkKQbHKF1+gv1DSQ1iydtkKG9XNl\nv5RQvQrCAeS0yX2ASRaFc48FWcdA0Egeusmi43g3+xLNYq2segNDDgCIgXCxjc9b\nKrxb6gWt9x+hiBiEprEKcWMojwgG4VT7fwcW9lC4Nw1utrRcnEjm/jB0vTVnIpIn\npRWVgd4e94Q3l+/U0PXNjIVITYa+UkK8VLS7NmQAQQKBgQDkEtOz4lWVr7kbXjLf\njxPd1fkn55i2ZNM6DxPJENiTR+oucZ8HlnJDm6EBZgEOlPxOkdns7jba8rh5QNSw\nE8f4Q0hUaNt2cq4vKH+eVQuCBKjxSD+bU/c3btx19Hw++OjphsPCaUTeSyzQn8tE\nHpKfDB6hhhJSK5ulHaxTnng/UQKBgQDDaUWqohP4fSZ9IXe6izwBwS8pm734UNEh\nNLX/hmONJGtIT21qw3CzcHrMeUB91LUdqUhEwHDrVzHLFhl3q31b2sbDNtdgxMRD\nH3pjVxpQ0eKftibPOdlagYaUEbRYrrKDbT5kTxs60bKH9ntGiufLEoIeqcotJsZW\nRdLDGlIG0QKBgQDYCTVbCSNEfIT8dYf+10pcMRinQesXqf2i2zFEnZ5oNBCRGbMn\nvsxRWhNyfaq2o00zJ1ij4yk2z/8Ja+2LM9GRSjozKnfnhM2VgekQk0IpUDyvAF6v\nxSNA8NQHLySZibElsy+u8YP4hIDYxOQHjGYaHaLOIW8tQn1WM/tN4afJYQKBgCqV\npHL9AzEhxON8CaWDdj5DpU2B/TJCGnEMFaVr2gIGL8MAXC3qDYNtPbWVrvI9CoM+\nQtuIvJLs25MQa9hibN05nhsotmMGPmcKUxeXAcsfEi4P+gEq8C0DERrviMfSumBd\nzDz76Ek3LZrnohHLb5wXmneoNMEGNC7U5ItUDxAhAoGBALrcvNadAndoDQMNmpjh\nqswZRDqxk/rTr44oz2+B3tyEE37AY4Sp7bGR7qFpyag0/xNipczmY5oySXgrEV5P\nT2ip+Yu5CSeWAV5Aiwm7FXvysFRx5TP+FAEfxGSz/J5zACrju4y6fuSGQQ/fxZJA\nDRAux5IkMRQ2yer14uI/CKw6\n-----END PRIVATE KEY-----\n",
    //   "client_email": "starting-account-duqk86gnezm6@quickstart-1715370391597.iam.gserviceaccount.com",
    //   "client_id": "110935775217276003414",
    //   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    //   "token_uri": "https://oauth2.googleapis.com/token",
    //   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    //   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/starting-account-duqk86gnezm6%40quickstart-1715370391597.iam.gserviceaccount.com",
    //   "universe_domain": "googleapis.com"
    // }
    // const keyFile = '/ga4.json';

    // const auth = new GoogleAuth({
    //   keyFilename: keyFile,
    //   // scopes: ['https://www.googleapis.com/auth/analytics.readonly'], // 要求的 API 权限
    // });

    // const credentials = {
    //   client_email: "starting-account-duqk86gnezm6@quickstart-1715370391597.iam.gserviceaccount.com",
    //   private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCuGCEL8iTMU+Vm\nZiqWXNzsQ3vmLOjsvdM5w/vipJmXtCyLitgmrDZXt+GBfTIPq5OCXGisJ9LQNDeW\nUd1IVuVFQZI6DGfbGdWObjhWrmul6r9KCaiuDr8QUojmF5MdULdDcklZWIOCLTFc\n3shZtnqxk/PeeS5pIYLVVxMCDmuLsSGg1E2WP8HtSqJBURGbnoNZIVnKTU0qud8T\naJTiLof4JOrQSVM5Roe29UOBu6C5LMq4f6NpxD9Bzcj3Zwf3GMfSeUc4crqfBXB3\nK5PL8Ssr9QOqj8O1Uesh3dXAx63pEk6eR3507yFVAQ9evoroCeZOllFLxRwc9tCC\nS6CzmZchAgMBAAECggEAB8SfWt1Z230l2AEYht+LYwZq1Z0s4n1g2qu+RkFichSx\nxSMznFwkS5sylnjL3kuhWBh/+iiHvU8LKOurtEHeVo4DtI/fpXTcZM/RtzpuprdY\nBDl0m5mgWF3aamvkXlM+7iVAFRrAOXODR5nQNkKQbHKF1+gv1DSQ1iydtkKG9XNl\nv5RQvQrCAeS0yX2ASRaFc48FWcdA0Egeusmi43g3+xLNYq2segNDDgCIgXCxjc9b\nKrxb6gWt9x+hiBiEprEKcWMojwgG4VT7fwcW9lC4Nw1utrRcnEjm/jB0vTVnIpIn\npRWVgd4e94Q3l+/U0PXNjIVITYa+UkK8VLS7NmQAQQKBgQDkEtOz4lWVr7kbXjLf\njxPd1fkn55i2ZNM6DxPJENiTR+oucZ8HlnJDm6EBZgEOlPxOkdns7jba8rh5QNSw\nE8f4Q0hUaNt2cq4vKH+eVQuCBKjxSD+bU/c3btx19Hw++OjphsPCaUTeSyzQn8tE\nHpKfDB6hhhJSK5ulHaxTnng/UQKBgQDDaUWqohP4fSZ9IXe6izwBwS8pm734UNEh\nNLX/hmONJGtIT21qw3CzcHrMeUB91LUdqUhEwHDrVzHLFhl3q31b2sbDNtdgxMRD\nH3pjVxpQ0eKftibPOdlagYaUEbRYrrKDbT5kTxs60bKH9ntGiufLEoIeqcotJsZW\nRdLDGlIG0QKBgQDYCTVbCSNEfIT8dYf+10pcMRinQesXqf2i2zFEnZ5oNBCRGbMn\nvsxRWhNyfaq2o00zJ1ij4yk2z/8Ja+2LM9GRSjozKnfnhM2VgekQk0IpUDyvAF6v\nxSNA8NQHLySZibElsy+u8YP4hIDYxOQHjGYaHaLOIW8tQn1WM/tN4afJYQKBgCqV\npHL9AzEhxON8CaWDdj5DpU2B/TJCGnEMFaVr2gIGL8MAXC3qDYNtPbWVrvI9CoM+\nQtuIvJLs25MQa9hibN05nhsotmMGPmcKUxeXAcsfEi4P+gEq8C0DERrviMfSumBd\nzDz76Ek3LZrnohHLb5wXmneoNMEGNC7U5ItUDxAhAoGBALrcvNadAndoDQMNmpjh\nqswZRDqxk/rTr44oz2+B3tyEE37AY4Sp7bGR7qFpyag0/xNipczmY5oySXgrEV5P\nT2ip+Yu5CSeWAV5Aiwm7FXvysFRx5TP+FAEfxGSz/J5zACrju4y6fuSGQQ/fxZJA\nDRAux5IkMRQ2yer14uI/CKw6\n-----END PRIVATE KEY-----\n",
    // };

    // const analyticsDataClient = new BetaAnalyticsDataClient({
    //   keyFilename: "/ga4.json",
    // });
    // async function runRealtimeReport() {
    //   // const client = await auth.getClient();

    //   // 创建 Google Analytics Data API 客户端
    //   const analyticsDataClient = new BetaAnalyticsDataClient({ credentials: credentials });
    //   const [response] = await analyticsDataClient.runRealtimeReport({
    //     property: 'properties/438524009',
    //     dimensions: [
    //       {
    //         name: 'country',
    //       },
    //     ],
    //     metrics: [
    //       {
    //         name: 'activeUsers',
    //       },
    //     ],
    //   });
    //   printRunReportResponse(response);
    // }
    
    // function printRunReportResponse(response) {
    //   setOnlineUsers(response);
    //   console.log(`${response.rowCount} rows received`);
    //   response.dimensionHeaders.forEach(dimensionHeader => {
    //     console.log(`Dimension header name: ${dimensionHeader.name}`);
    //   });
    //   response.metricHeaders.forEach(metricHeader => {
    //     console.log(
    //       `Metric header name: ${metricHeader.name} (${metricHeader.type})`
    //     );
    //   });
  
    //   console.log('Report result:');
    //   response.rows.forEach(row => {
    //     console.log(
    //       `${row.dimensionValues[0].value}, ${row.metricValues[0].value}`
    //     );
    //   });
    // }
    
    // async function runRealtimeReport() {
    //   const metrics = [{ name: 'activeUsers' }];
    //   const dimensions = [{ name: 'country' }];

    //   const requestBody = {
    //     // dateRanges: [{ startDate, endDate }],
    //     metrics,
    //     dimensions,
    //     key: "AIzaSyDQc5o1y-h70-lDHGWJd35_4h6sO8KPGPM",
    //   };

    //   const headers = {
    //     'Content-Type': 'application/json',
    //     // Authorization: `Bearer ${ accessToken }`,
    //     // "key": "AIzaSyDQc5o1y-h70-lDHGWJd35_4h6sO8KPGPM",
    //   };

    //   const apiResponse = await axios.post(
    //     `https://analyticsdata.googleapis.com/v1beta/properties/${ propertyId }:runReport`,
    //     requestBody,
    //     { headers }
    //   );

    //   const responseData = apiResponse.data;
    //   console.log( "responseData", responseData );
    // }
    // runRealtimeReport()

    // const _getWB = setInterval(runRealtimeReport, 15000); // 每5秒自动刷新数据
    // return () => {
    //   clearInterval(_getWB); 
    // };
  }, []);

  
  
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