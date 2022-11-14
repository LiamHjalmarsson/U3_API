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

    $request_Method = $_SERVER["REQUEST_METHOD"];

    $database = [];
    
    if (file_exists($file_Name)) {
        $request_File = file_get_contents($file_Name);
        $database = json_decode($request_File, true);
    }

    if ($request_Method != "POST") {
        $error = ["error" => "Wrong http method need to us POST you are using $requestMethod!"];
        sendJSON($error, 405);
    }

    $requestJSON = file_get_contents("php://input");
    $requestData = json_decode($requestJSON, true);

    $id = $_POST["id"];

    foreach ($database as $index => $data) {
        
        if ($data["id"] == $id) {

            $fiel_Source = $_FILES["image"]["tmp_name"];
            $new_file_Name = $_FILES["image"]["name"];
            $file_Size = $_FILES["image"]["size"];
            $file_Type = $_FILES["image"]["type"];
            
            $name_no_space = str_replace((" "), ("_"), ($new_file_Name));
            
            $timestamp = time();
                
            $destination = "uploades/$timestamp-$name_no_space";
                
            if ($file_Size > 250000) {
                $error = ["error" => "The size is to big $file_Size cant be bigger then 250000!"];
                sendJSON($error, 402);
            }
                
            if ($file_Type != "image/jpeg" and $file_Type != "image/jpg") {
                $error = ["error" => "The file format $file_Type is not allowed. Please us JPEG or JPG!"];
                sendJSON($error, 400);
            }
        
            if (move_uploaded_file($fiel_Source, $destination)) {
                        
                $data["src"] = $destination;
                $database[$index] = $data;

                $json = json_encode($database, JSON_PRETTY_PRINT);
                file_put_contents($file_Name, $json);
                sendJSON($data);                    
            }
            
        }
        
    }
