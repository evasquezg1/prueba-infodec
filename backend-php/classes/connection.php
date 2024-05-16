<?php

    class Connection{

        public static function connect(){
            if($conn = new PDO("mysql:host=localhost;dbname=planificador_viaje", "root", "", array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'))){
				return $conn;
			}else{
				return null;
			}
        }

    }

?>