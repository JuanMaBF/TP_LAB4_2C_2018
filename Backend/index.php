<?php

    require 'vendor/autoload.php';

    $app = new Slim\App();
    
    $app->options('/{routes:.+}', function ($request, $response, $args) {
        return $response;
    });
    
    $app->add(function ($req, $res, $next) {
        $response = $next($req, $res);
        return $response
                ->withHeader('Access-Control-Allow-Origin', '*')
                ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    });

    $app->post('/login', function($request, $response, $args) {
        $getUser = json_decode($request->getBody(), true);
        $loginResponse = AuthService::Authenticate($getUser['user'], $getUser['password']);
        //return json_encode($loginResponse);
    });

    $app->get('/hola', function($request, $response, $args) {
        echo 'hola';
    });

    $app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
        $handler = $this->notFoundHandler; // handle using the default Slim page not found handler
        return $handler($req, $res);
    });

    $app->run();

?>