<?php
 require_once 'PHPExcel.php';
 require_once 'PHPExcel/IOFactory.php';
 $phpexcel = PHPExcel_IOFactory::load("gate-1041__in.xlsx"); 

 $phpexcel->setActiveSheetIndex(0);
 $aSheet = $phpexcel->getActiveSheet();
 $lastRow  = 6046; 
 $valHeader =  Array(  );
 for ($i=0;$i<=5;$i++) {
  $cell = $aSheet->getCellByColumnAndRow($i,1);
  $valHead = $cell->getValue();
  $valHeader[$i] =  str_replace(array('Месяц','IDP','Менеджер','Проект','Оператор','Валюта'),array('month','idp','manager','project','operator','currency'),$valHead);

  if ($valHeader[$i]=='idp') { $iIDP = $i; };
 };
 
 mysql_connect ("localhost","root","");
 mysql_select_db("firma") or die (mysql_error());
 mysql_query('SET character_set_database = utf8_general_ci');
 mysql_query ("SET NAMES 'utf8'");
 $k = 2;
 while ($k<=$lastRow) {
 $cell = $aSheet->getCellByColumnAndRow($iIDP,$k);
 $valIDP = $cell->getValue();
 $sql="SELECT * FROM example WHERE idp=".$valIDP;
 $rez=mysql_query($sql);
    While($row=mysql_fetch_assoc($rez)){
         foreach($valHeader as $key => $value) { 
		      $pr = $aSheet->getCellByColumnAndRow($key, $k);
			  $tr = $pr->getValue();
		      if (empty($tr)) {	
		      $aSheet->setCellValueByColumnAndRow($key, $k, $row[$value]);
			 };
		 };
    };
	
	$k++;
 };
   // header("Content-Type:application/vnd.ms-excel");
   // header("Content-Disposition:attachment;filename='gate-1041__in.xlsx'");

    $objWriter = PHPExcel_IOFactory::createWriter($phpexcel, 'Excel2007');
	$objWriter->save('gate-1041__in.xlsx');
	
	echo '<table border="1" cellspacing="0"><tr>';
        for ($rowj = 1; $rowj <= $lastRow; ++$rowj)
        {
            echo '<tr>';
            for ($colj = 0; $colj < 5; ++ $colj) 
            {
                $valj = $aSheet->getCellByColumnAndRow($colj, $rowj)->getValue();
                echo '<td>'.$valj.'&nbsp;</td>';
            };
            echo '</tr>';
        };
        echo '</table>'; 
	
	
	
	$phpexcel->disconnectWorksheets(); 				
	unset($phpexcel);

?>