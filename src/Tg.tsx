
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Link } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';



export default function Tg(props) {
  const { t } = props;
  useEffect(() => {
    async function getValue() {
      const view = document.getElementById('content-view-tg');
      const myScript = document.createElement("script");
      myScript.src = "https://telegram.org/js/telegram-widget.js?22";
      myScript.type = "text/javascript";
      myScript.async = true
      myScript.setAttribute('data-telegram-discussion',"jeerclub/3");
      myScript.setAttribute('data-comments-limit',"5" );
      myScript.setAttribute('data-height',"auto" );
      myScript.setAttribute('data-colorful',"1" );
      myScript.setAttribute('data-dark',"1" );
      view!!.appendChild(myScript);
    }
    if (window.matchMedia('(min-width: 768px)').matches) {
      getValue()
    }
  }, []);

  return (
    <Card className="min-w-[500px] min-h-[400px] " radius="sm">
      <div id="content-view-tg">
      </div>
      <Divider />
      <CardFooter className="flex flex-raw justify-end">
        <Link
          isExternal
          showAnchorIcon
          href="https://t.me/jeerclub"
        >
          {t("Leave a clue in Telegram")}
        </Link>
      </CardFooter>
    </Card>
  );
}
