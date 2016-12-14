<?php
get_header();
 ?>
<div id="maine-content" class="site-content-zajavka">
<?
if (isset($send_zajav)) {echo " </div> <div class=\"div_none_block\" >";};
include('config.php');
$link = mysql_connect($dbhost, $dbuser, $dbpasswd) or die("Couldn't establish connection");
mysql_select_db($dbname);
$_POST["id_kat"] = $_GET["id_kat"];
$query = "SELECT * FROM wp_kat_zajav ";
$result = mysql_query($query);
$num_rows = mysql_num_rows($result);
include('captcha_img/captcha.php');
$inp_id=$_POST["input_id"];
if (!isset($inp_id)) {$inp_id=0;};
$_POST["inpZ"]=$inp_id;

echo "<div class=\"div_none_block\" >"; 
if ($inp_id == 1) {echo " </div> <div class=\"div_visi_block\" >";};
echo "<form method=\"POST\" action=\"http://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI']."\">";
echo "<table border=\"0\" width=\"33%\">";
echo "    <tr><td><br></td></tr> ";
echo "    <tr>";
echo "      <td width=\"35%\">Категория заявки:</td>";
echo "      <td width=\"65%\"><select size=\"1\" name=\"name_katz\" required>";
for($i=0; $i <$num_rows; $i++) {
    $row = mysql_fetch_array($result);
    echo "                         <option value=\"kat".$row["id_kat"]."\" >".$row["name_katz"]." </option>";
                               };
echo "                        </select>";
echo "      </td>";
echo "    </tr>";
echo "    <tr><td><br></td></tr> ";
echo "    <tr>";
echo "      <td width=\"35%\">ФИО контакного лица:</td>";
echo "      <td width=\"65%\" ><input type=\"text\" name=\"fio\" size=\"120\" placeholder=\" ФИО \" required></td>";
echo "    </tr>";
echo "    <tr><td><br></td></tr> ";
echo "    <tr>";
echo "      <td width=\"35%\">Телефон:</td>";
echo "      <td width=\"65%\"><input type=\"tel\" name=\"telephone\" size=\"35\"></td>";
echo "    </tr>";
echo "    <tr><td><br></td></tr> ";
echo "    <tr>";
echo "      <td width=\"35%\">E-mail:</td>";
echo "      <td width=\"65%\"><input type=\"email\" name=\"email\" size=\"35\" required></td>";
echo "    </tr>";
echo "    <tr><td><br></td></tr> ";
echo "    <tr>";
echo "      <td width=\"35%\">Адрес</td>";
echo "      <td width=\"65%\"><input type=\"text\" name=\"location\" size=\"120\" ></td>";
echo "    </tr>";
echo "    <tr><td><br></td></tr> ";
echo "    <tr>";
echo "      <td width=\"35%\">Краткое описание заявки:</td>";
echo "      <td width=\"65%\"><textarea rows=\"5\" cols=\"45\" name=\"textzajav\" required> </textarea> </td>";
echo "    </tr>";

echo "\r\n";
echo "   <input type=\"hidden\" name=\"id_kat\" value=\"{$_GET['id_kat']}\">";
echo "   <input type=\"hidden\" name=\"inpZ\" value=\"{$_POST['inpZ']}\">";
echo "  </table>";
echo "  <p>&nbsp;&nbsp;&nbsp;<input type=\"submit\" value=\"Отправить заявку\" name=\"send_zajav\"> &nbsp;&nbsp;&nbsp;  <input type=\"reset\" value=\"Сбросить\" name=\"B2\"></p>";
echo "</form>";
$send_zajav=$_POST["send_zajav"];
if ( isset($send_zajav)) {
$name_katz = $_POST["name_katz"];
$fio = $_POST["fio"];
$telephone = $_POST["telephone"];
$sender = $_POST["email"];
$location = $_POST["location"];
$textzajav = $_POST["textzajav"];
$id_kat = $_POST["id_kat"];
$inp_id = $_POST["inp_id"];
$mail_send = "m@yandex.ru";
$subject="Заявка на выполнение работ от -".$fio."-e-mail:".$sender;
$content=$name_katz."\r\n"."Адрес:".$location."\r\n"."Телефон:".$telephone."\r\n".$textzajav;

mail($mail_send,$subject,$content,"From:$sender\r\n");
echo "   <input type=\"hidden\" name=\"send_zajav\" value=\"{$_POST['send_zajav']}\">";
echo " </div> <div class=\"div_visi_block\" >";
?>
<script>
$('.site-content-zajavka #div_capt').css('visibility', 'hidden');
</script>
<?
echo " <div id = \"ansToM\" > <h4>Заявка отправлена. Ответ Вам будет направлен по адресу :".$sender;
//}
echo "<img src=\"http://".$_SERVER['SERVER_NAME']."/wp-content/uploads/2016/09/mailans.jpg\"/>";
echo "  <a href=\"http://".$_SERVER['SERVER_NAME']."\"  ?>Продолжить-></a><br></h4></div>";

};
echo "</div>";
?>
</div>
<?php
get_footer();

