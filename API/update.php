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

    $request_Method = $_SERVER["REQUEST_METHOD"];

    $database = [];

    if (file_exists($file_Name)) {
        $request_File = file_get_contents($file_Name);
        $database = json_decode($request_File, true);
    }
    
    $requestJSON = file_get_contents("php://input");
    $requestData = json_decode($requestJSON, true);

    if ($request_Method != "PUT") {
        sendJSON($database, 405);
    }

    $name = $requestData["name"];
    $age = $requestData["age"];
    $breed = $requestData["breed"];

    foreach ($database as $index => $data) {
        if ($data["id"] != $requestData["id"]) {
            sendJSON($database, 400);
        } else {
            $data["name"] = $name;
            $data["age"] = $age;
            $data["breed"] = $breed;

            $database[$index] = $data;

            $json = json_encode($database, JSON_PRETTY_PRINT);
            file_put_contents($file_Name, $json);
                
            sendJSON($requestData);
        }
    }