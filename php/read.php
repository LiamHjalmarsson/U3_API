<?php

    ini_set("display_errores", 1);

    function sendJSON($data, $satuscode = 200) {
        header("Content-Type: application/json");
        http_response_code($satuscode);
        $json = json_encode($data);
        echo $json;
        exit();
    } 

    $file_Name = "database.json";

    $database = [];

    if (file_exists($file_Name)) {
        $request_File = file_get_contents($file_Name);
        $database = json_decode($request_File, true);
    }

    $request_Method = $_SERVER["REQUEST_METHOD"];

    if ($request_Method != "GET") {
        sendJSON($database, 405);
    } 

    if ($database == []) {
        sendJSON($database);
    }
        
    foreach ($database as $data) {

        if (!isset($data["id"], $data["name"], $data["age"], $data["breed"])) {
            sendJSON($database);
        } else {
            sendJSON($database);
        }
        
    }

        
        
