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

    $app->post('/guardarJuego', function($request, $response, $args) {
        $params = json_encode($request->getParams());
        $myfile = fopen("resultados.txt", "w") or die("Unable to open file!");
        fwrite($myfile, $params);
        fclose($myfile);
    });

    $app->get('/traerTodos', function($request, $response, $args) {
        $myfile = fopen("resultados.txt", "r") or die("Unable to open file!");
        $body = $response->getBody();
        $contenido = fread($myfile,filesize("resultados.txt"));
        $body->write($contenido);
        fclose($myfile);
    });

    $app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
        $handler = $this->notFoundHandler; // handle using the default Slim page not found handler
        return $handler($req, $res);
    });

    $app->run();

?>