<?php

    require 'services/vendor/autoload.php';
    require 'services/auth.service.php';
    require 'services/pedido.service.php';

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

    $app->post('/registro', function($request, $response, $args) {
        $user = json_decode($request->getBody());
        $result = UsersService::AddUser($user->user, $user->password, $user->type);
        if($result == "ok") {
            $loginResponse = AuthService::Authenticate($user->user, $user->password);
            return json_encode($loginResponse);
        } else {
            return $result;
        }
    });

    $app->post('/traerTodos', function($request, $response, $args) {
        $pedidoResponse = PedidoService::TraerTodos();
        return json_encode($pedidoResponse);
    });

    $app->post('/alta', function($request, $response, $args) {
        $pedido = json_decode($request->getBody());
        $pedidoResponse = PedidoService::Alta($pedido->pedido);
        return json_encode($pedidoResponse);
    });

    $app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
        $handler = $this->notFoundHandler; 
        return $handler($req, $res);
    });

    $app->run();

?>