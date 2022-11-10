<?php

    ini_set("display_errors", 1);

    function sendJSON($data, $satuscode = 200) {
        header("Content-Type: application/json");
        http_response_code($satuscode);
        $json = json_encode($data);
        echo $json;
        exit();
    } 

    $file_Name = "database.json";

    if (file_exists($file_Name)) {
        $request_File = file_get_contents($file_Name);
        $database = json_decode($request_File, true);
    }

    $database = [];

    $requestMethod = $_SERVER["REQUEST_METHOD"];
    
    $requestFile = file_get_contents("php://input");
    $json_Data = json_decode($requestFile, true);

    if  ($requestMethod != "POST") {

        sendJSON($database, 405);
        
    } else {

        if (!isset($json_Data["band"], $json_Data["album"])) {
            $error = [];
            sendJSON($error, 451);
        } 
        
        $band = $json_Data["band"]; 
        $album = $json_Data["album"]; 

        if ($band == "" or $album == "") {

            $error = ["error" => "Missing information"];
            sendJSON($error, 405);

        } else {

            $heighst_Id = 0; 

            foreach ($database as $data) {
                if ($data["id"] > $heighst_Id) {
                    $heighst_Id = $data["id"];
                }
            }
    
            $next_Id = $heighst_Id + 1;
            $new = ["id" => $next_Id, "band" => $band, "album" => $album];
    
            $database[] = $new;
            $json = json_encode($database, JSON_PRETTY_PRINT);
            file_put_contents($file_Name, $json);
            sendJSON($new);
        }
    }

?>