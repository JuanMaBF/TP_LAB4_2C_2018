<?php
 
    header("Access-Control-Allow-Origin: *");
    
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(array('status' => false));
    exit;
    }
    
    $path = 'uploads/';
    
    if (isset($_FILES['file'])) {
    $originalName = $_FILES['file']['name'];
    $ext = '.'.pathinfo($originalName, PATHINFO_EXTENSION);
    $date = new DateTime();
    $timeStamp = $date->getTimestamp();
    $generatedName = $timeStamp.$ext;
    $filePath = $path.$generatedName;
    if (!is_writable($path)) {
        echo json_encode(array(
        'status' => false,
        'msg'    => $filePath
        ));
        exit;
    }
    
    if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
        echo json_encode(array(
        'status'        => true,
        'originalName'  => $originalName,
        'generatedName' => $generatedName
        ));
    }
    }
    else {
    echo json_encode(
        array('status' => false, 'msg' => 'No file uploaded.')
    );
    exit;
    }
 
?> 