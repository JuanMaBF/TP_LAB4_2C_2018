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

    $app->post('/uploadFile', function(Request $request, Response $response) {
        $directory = $this->get('upload_directory');
    
        $uploadedFiles = $request->getUploadedFiles();
    
        return json_encode($_FILES['file']);

        /*// handle single input with single file upload
        $uploadedFile = $uploadedFiles['example1'];
        if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
            $filename = moveUploadedFile($directory, $uploadedFile);
            $response->write('uploaded ' . $filename . '<br/>');
        }
    
    
        // handle multiple inputs with the same key
        foreach ($uploadedFiles['example2'] as $uploadedFile) {
            if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
                $filename = moveUploadedFile($directory, $uploadedFile);
                $response->write('uploaded ' . $filename . '<br/>');
            }
        }
    
        // handle single input with multiple file uploads
        foreach ($uploadedFiles['example3'] as $uploadedFile) {
            if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
                $filename = moveUploadedFile($directory, $uploadedFile);
                $response->write('uploaded ' . $filename . '<br/>');
            }
        }*/
    
    });

    $app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
        $handler = $this->notFoundHandler; 
        return $handler($req, $res);
    });

    $app->run();

?>