<?php
    date_default_timezone_set("America/Bogota");

    function getHistory($req, $res){
        $connect = Connection::connect();
        $rt = array();

        //buscar los países en la tabla countries
        $sql = $connect->prepare("SELECT * FROM history ORDER BY id DESC LIMIT 5");
        $sql->execute();
        $rt = $sql->fetchAll();

        return $res->withStatus(200)->write(json_encode($rt));
    }

    function saveHistory($req, $res){
        $connect = Connection::connect();
        $datos = json_decode($req->getBody(), true);

        $dateCurrent = date("Y-m-d H:i:s");

        $sql = $connect->prepare("INSERT INTO history VALUES(NULL, '".$datos['country']."', '".$datos['city']."', '".$datos['name']."', '".$datos['budget']."', '".$datos['weather']."', '".$datos['local_currency']."', '".$datos['symbol_currency']."', '".$datos['budget_local']."', '".$datos['exchange_rate']."', '".$dateCurrent."')");
        $sql->execute();
    }

    function getContentHtmlExternalPage($req, $res){
        $params = $req->getParams();

        $rt = array();
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $params["urlPage"]);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        $results = curl_exec($ch);
        curl_close($ch);
        $rt['html'] = $results;
        $rt['from'] = $params["urlPage"];

        return $res->write(json_encode($rt));
    }

    function getCities($req, $res, $args){
        $connect = Connection::connect();
        $rt = array();

        //buscar los países en la tabla countries
        if(!empty($args) && !empty($args['countries_id'])){
            $sql = $connect->prepare("SELECT * FROM cities WHERE active='1' AND countries_id='{$args['countries_id']}' ORDER BY name_city ASC");
            $sql->execute();
            $rt = $sql->fetchAll();

            return $res->withStatus(200)->write(json_encode($rt, JSON_UNESCAPED_UNICODE));
        }
        
    }

    function getCountries($req, $res, $args){
        $connect = Connection::connect();
        $rt = array();

        //buscar los países en la tabla countries
        $sql = $connect->prepare("SELECT * FROM countries WHERE active='1' ORDER BY name_country ASC");
        $sql->execute();
        $rt = $sql->fetchAll();

        return $res->withStatus(200)->write(json_encode($rt, JSON_UNESCAPED_UNICODE));
    }

?>