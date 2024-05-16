<?php
    use \Psr\Http\Message\ServerRequestInterface as Request;
    use \Psr\Http\Message\ResponseInterface as Response;

    require 'vendor/autoload.php';
    require 'classes/api.php';
    require 'classes/connection.php';

    $app = new \Slim\App();

    $app->group('/v1', function () use ($app) {

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