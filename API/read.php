<?php

    ini_set("display_errores", 1);

    function sendJSON($data, $satuscode = 200) {
        header("Content-Type: application/json");
        http_response_code($satuscode);
        $json = json_encode($data);
        echo $json;
        exit();
    } 

    $file_Name = "./json/database.json";

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
        $error = ["error" => "The array is empety pleacse add something"];
        sendJSON($error, 405);
    }
        
    foreach ($database as $data) {

        if (!isset($data["id"], $data["band"], $data["album"])) {
            sendJSON($database);
        } else {
            sendJSON($database);
        } 

    }

