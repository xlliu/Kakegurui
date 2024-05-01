
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Link } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';



export default function Tg(props) {
  const { t } = useTranslation();
  useEffect(() => {
    async function getValue() {
      // const sc = document.getElementById('telegram-discussion-jeerclub-3-1');
      const view = document.getElementById('content-view-tg');
      
      const myScript = document.createElement("script");
      myScript.src = "https://telegram.org/js/telegram-widget.js?22";
      myScript.type = "text/javascript";
      myScript.async = true
      myScript.setAttribute('data-telegram-discussion',"jeerclub/3");
      myScript.setAttribute('data-comments-limit',"5" );
      myScript.setAttribute('data-height',"700" );
      myScript.setAttribute('data-colorful',"1" );
      myScript.setAttribute('data-dark',"1" );
      view!!.appendChild(myScript);
    }
    // setTimeout(getValue, 3000); // 每5秒自动刷新数据
    // const intervalId = setInterval(getValue, 5000); // 每5秒自动刷新数据
    // return () => {
    //   // view!!.removeChild(sc!!);
    //   clearInterval(intervalId); // 在组件卸载时清除定时器
    // }
   
    if (window.matchMedia('(min-width: 768px)').matches) {
      getValue()
      // console.log('按钮被点击了');
    }
  }, []);

  return (
    <Card className="min-w-[200px] min-h-[500px] hidden md:block" radius="sm">
      <div id="view-tg">
        {/* <script 
          type="text/javascript"
          // async 
          src="https://telegram.org/js/telegram-widget.js?22" 
          data-telegram-discussion="jeerclub/3" 
          data-comments-limit="5" 
          data-height="500"  
          data-colorful="1" 
          data-dark="1" ></script> */}
      </div>
      
      <div id="content-view-tg">

      </div>
    </Card>
  );
}
