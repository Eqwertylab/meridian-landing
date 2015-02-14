<?php
	$nodata = "Нет данных";

	if(isset($_POST['name'])) 		{$name = $_POST['name'];} 		else {$name = $nodata;};
	if(isset($_POST['tel'])) 		{$tel = $_POST['tel'];} 		else {$tel = $nodata;};
	if(isset($_POST['message'])) 	{$message = $_POST['message'];} else {$message = $nodata;};
	if(isset($_POST['submit'])) 	{$submit = $_POST['submit'];} 	else {$submit = $nodata;};

	$win = array(	'title'	=> 	'Заявка принята!',
					'desc' 	=>	'В бижайщее время с Вами свяжется менеджер.');

	$crash = array(	'title' => 	'Произошла ошибка :(',
					'desc'	=>	'Повторите отправку позже или позвоните нам по телефону.' );

	$emailFrom = 'info@tophit.pro'; // От кого
	$e_sendto =  '79225555735@yandex.ru'; //Кому
	$e_subject = 'Сообщение с m.tagheuer.tophit.pro '; //.$feedback;
	$e_body = "Cообщение с формы ". $submit ." от: "
					.$name								
					. "\n"
					."Телефон: " . $tel								
					. "\n"
					."Сообщение: " . $message								
					. "\n"
					."\r\n\n";

	if(mail($e_sendto, $e_subject, $e_body, "From: $emailFrom\r\nReply-To: $emailFrom\r\nReturn-Path: $emailFrom\r\n"))
	{						 
		echo json_encode($win);
	} 
	else 
	{
		echo json_encode($crash);
	}	

?>