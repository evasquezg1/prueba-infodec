<?php

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
        if(!empty($args) && !empty($args['id'])){
            $sql = $connect->prepare("SELECT * FROM countries WHERE active='1' AND id='{$args['id']}'");
        }else{
            $sql = $connect->prepare("SELECT * FROM countries WHERE active='1' ORDER BY name_country ASC");
        }

        $sql->execute();
        $rt = $sql->fetchAll();

        return $res->withStatus(200)->write(json_encode($rt, JSON_UNESCAPED_UNICODE));
    }

?>