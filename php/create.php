<?php

    ini_set("display_errors", 1);

    function sendJSON($data, $satuscode = 200) {
        header("Content-Type: application/json");
        http_response_code($satuscode);
        $json = json_encode($data);
        echo $json;
        exit();
    } 

    $file = "database.json";

    $database = [];

    $requestMethod = $_SERVER["REQUEST_METHOD"];
    
    $requestFile = file_get_contents("php://input");
    
    $json_Data = json_decode($requestFile, true);

    if  ($requestMethod != "POST") {
        sendJSON($database, 405);
    } else {
        if (!isset($json_Data["name"], $json_Data["age"], $json_Data["breed"])) {
            $error = [];
            sendJSON($error, 451);
        } 
        
        $name = $json_Data["name"]; 
        $age = $json_Data["age"]; 
        $breed = $json_Data["breed"]; 

        if ($name == "" and $age == 0 and $breed == "") {
            $error = ["error" => "Missing information"];
            sendJSON($error, 405);
        } else {
            $heighst_Id = 0; 

            foreach ($database as $dog) {
                if ($dog["id"] > $heighst_Id) {
                    $heighst_Id = $dog["id"];
                }
            }
    
            $next_Id = $heighst_Id + 1;
            $new = ["id" => $next_Id, "name" => $name, "age" => $age, "breed" => $breed];
    
            $database[] = $new;
            $json = json_encode($database, JSON_PRETTY_PRINT);
            file_put_contents($file, $json);
            sendJSON($new);
        }
    }

?>