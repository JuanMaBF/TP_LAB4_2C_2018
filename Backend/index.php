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

    $app->get('/traerTodos', function($request, $response, $args) {
        //$token = json_decode($request->getBody());
        //if(AuthService::ValidateUserTo($token, 'test')) {
            $pedidosArray = PedidoService::TraerTodos();
            return json_encode($pedidosArray);
        //}
        //return 'TokenExpirado';
    });

    $app->post('/traerTodos', function($request, $response, $args) {
        $token = json_decode($request->getBody());
        if(AuthService::ValidateUserTo($token, 'test')) {
            $pedidosArray = PedidoService::TraerTodos();
            return json_encode($pedidosArray);
        }
        return 'TokenExpirado';
    });

    $app->post('/altaPedidos', function($request, $response, $args) {
        $pedidos = json_decode($request->getBody());
        if(AuthService::ValidateUserTo($pedidos->token, 'test')) {
            try {
                foreach($pedidos->pedidos as $ped) { 
                    PedidoService::Alta($ped);
                    renameTempFile($ped->mesa, $ped->mozo);
                }
                return 'ok';
            } catch(Exception $e) {
                return json_encode($e);
            }
        }
        return 'TokenExpirado';
    });

    $app->post('/actualizarPedidos', function($request, $response, $args) {
        $pedidos = json_decode($request->getBody());
        if(AuthService::ValidateUserTo($pedidos->token, 'test')) {
            try {
                foreach($pedidos->pedidos as $ped) { 
                    PedidoService::Update($ped);
                }
                return 'ok';
            } catch(Exception $e) {
                return json_encode($e);
            }
        }
        return 'TokenExpirado';
    });

    $app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
        $handler = $this->notFoundHandler; 
        return $handler($req, $res);
    });

    $app->run();

    function renameTempFile($mesa, $mozo) {
        if(file_exists('uploads/temp.jpg')) {
            rename('uploads/temp.jpg', 'uploads/'.$mesa.'-'.$mozo.'.jpg');
        } else if(file_exists('uploads/temp.png')) {
            rename('uploads/temp.png', 'uploads/'.$mesa.'-'.$mozo.'.png');
        }
    }

?>