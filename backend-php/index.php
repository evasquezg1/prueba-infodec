<?php
    use \Psr\Http\Message\ServerRequestInterface as Request;
    use \Psr\Http\Message\ResponseInterface as Response;

    require 'vendor/autoload.php';
    require 'classes/api.php';
    require 'classes/connection.php';

    $app = new \Slim\App();

    $app->group('/v1', function () use ($app) {

        $app->get('/getCountries', 'getCountries');
        $app->get('/getCountries/{id}', 'getCountries');
        $app->get('/getCities/{countries_id}', 'getCities');

    })->add(function ($req, $res, $next) {
        $res  = $next($req, $res);
        return $res ->withHeader('Content-Type', 'application/json');
    });
    
    $app->run();
?>