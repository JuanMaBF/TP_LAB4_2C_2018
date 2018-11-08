<?php

    require 'services/vendor/autoload.php';
    require 'services/auth.service.php';
    require 'services/users.service.php';

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
        $user = json_decode($request->getBody());
        $loginResponse = AuthService::Authenticate($user->user, $user->password);
        return json_encode($loginResponse);
    });

    $app->get('/registro', function($request, $response, $args) {
        $user = json_decode($request->getBody());
        return UsersService::AddUser($user->user, $user->password);
    });

    $app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
        $handler = $this->notFoundHandler; 
        return $handler($req, $res);
    });

    $app->run();

?>