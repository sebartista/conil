<?php
//require_once "/vendor/autoload.php";

if( isset($_POST['data']) ){
	if(isset($_POST['g-recaptcha-response'])){
		$captcha=$_POST['g-recaptcha-response'];

		if(!$captcha){
			die("badcaptcha");          
		}
		$response=json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6LdM8HgUAAAAAAx-RYoCgDYUFF_GEyIHl71VhLAa&response=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR']), true);
		if($response['success'] == false){
			die("badcaptcha");
		} else {

			$to      = 'mgarciadutriez@gmail.com';
			$subject = 'Conil Contacto';

			$message = '<p>Este email ha sido desde el formulario de contacto de Conil</p>';
			$message .= '<table>';
			$message .= '<tbody>';
			$message .= '<tr>';
			$message .=	'<th>Nombre:</th><td>'.$_POST['data']['nombre'].'</td>';		
			$message .= '</tr><tr>';
			$message .=	'<th>Mail:</th><td>'.$_POST['data']['email'].'</td>';
			$message .= '</tr><tr>';
			$message .=	'<th>Mail:</th><td>'.$_POST['data']['empresa'].'</td>';
			$message .= '</tr><tr>';
			$message .=	'<th>Tel&eacute;fono:</th><td>'.$_POST['data']['telefono'].'</td>';
			$message .= '</tr><tr>';
			$message .=	'<th>Mensaje:</th><td>'.$_POST['data']['consulta'].'</td>';
			$message .= '</tr>';

			$message .= '</tbody>';
			$message .= '</table>';

			$email_to = "info@conilpublicidad.com.ar";
					// 1nf0Habitar


				// To send HTML mail, the Content-type header must be set
			$headers  = 'MIME-Version: 1.0' . "\r\n";
			$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

				// Additional headers
			$headers .= 'Bcc: mgarciadutriez@hotmail.com'."\r\n";
			$headers .= 'From: info@conilpublicidad.com.ar' . "\r\n";
			if(mail($to, $subject, $message, $headers)){
				echo "success";
			}
		
		}
	} else {
		echo "badcaptcha";
	}
} else {
	echo "empty";
}
?>