<?php
include_once __DIR__ . "/main.php";
if (isset($_POST))
{
    $values = array_values($_POST);
    $twice = 0;
    $p = "";
    $tx = "";
    $ch = array_chunk($_POST, 2);
    //var_dump($ch);
    foreach ($ch as $key => $val)
    {
        $title = "";
        $msg = "";
        foreach ($ch[$key] as $k => $value)
        {
            $title = $ch[$key][0];
            $msg = $ch[$key][1];

        }
        $tx .= "
        [ $title ] : $msg .\n\r
        ";
       
        $p .= <<< EOT
            <div id="message" style="border-radius: 6px;  border: 1px solid #e9e9e9; margin: 10px 0;">
            <div class="title" style="font-size: 15px; font-weight: bold;  ">
                <p>$title</p>
            </div>
            <div class="content" style=" ">
                <p>$msg</p>
            </div>
        </div>
        EOT;
        
    }
    echo $tx;
   if(EMAIL_ENABLE == "yes") {
    try {
        $luming->sendMail($p);
       } catch(Exception $e) {
        echo $e->getMessage();
       }
   } if (TELEGRAM_ENABLE == "yes") {
    try {
        $luming->sendTelegram_msg(TOKEN,CHAT_ID,"$tx");
       } catch(Exception $e) {
        echo $e->getMessage();
       }
   } if(TEXT_ENABLE) {
    $luming->save(FILE_NAME,$tx);
   }

}
