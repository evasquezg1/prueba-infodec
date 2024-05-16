<?php
    use \Psr\Http\Message\ServerRequestInterface as Request;
    use \Psr\Http\Message\ResponseInterface as Response;
    
    require 'vendor/autoload.php';
    //archivo que contiene las funciones a ejecutar cuando se invoque cada servicio
    require 'classes/api.php';
    //archivo para la conexión a la base de datos a través de PDO
    require 'classes/connection.php';

    $app = new \Slim\App();

    //Se establece un grupo para agrupar los servicios generados
    $app->group('/v1', function () use ($app) {

        //el primer parámetro corresponde al servicio a invocar y el segundo es la función que se encuentra en classes/api.php
        $app->get('/getCountries', 'getCountries');
        $app->get('/getCities/{countries_id}', 'getCities');
        $app->get('/getContentHtmlExternalPage', 'getContentHtmlExternalPage');
        $app->get('/getHistory', 'getHistory');

        $app->post('/saveHistory', 'saveHistory');

    })->add(function ($req, $res, $next) {
        $res  = $next($req, $res);
        return $res ->withHeader('Content-Type', 'application/json');
    });
    
    $app->run();
?>