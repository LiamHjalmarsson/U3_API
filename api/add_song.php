<?php

    ini_set("display_errors", 1);

    require_once "functions.php";

    $file_Name = "./json/database.json";

    $requestMethod = $_SERVER["REQUEST_METHOD"];
    
    if ($requestMethod != "POST") {
        $error = error_Message("Not a valied HTTP method is used need to use POST you are using $requestMethod");
        sendJSON($error, 405);
    }

    $contentType = $_SERVER["CONTENT_TYPE"];

    $database = [];

    if ($contentType != "application/json") {
        $error = error_Message("Invalid content $contentType need to use JSON");
        sendJSON($error, 400);
    }

    // Om filen finns 
     if (file_exists($file_Name)) {
        // hämtar filen 
        $json = file_get_contents($file_Name);
        // konveterar fil datan till php 
        $users = json_decode($json, true);
    }

    $requestJSON = file_get_contents("php://input");
    $requestData = json_decode($requestJSON, true);

    if ($requestMethod == "POST") {

        // kontrollear om de inte finns 
        // if (!isset($requestData["first_name"], $requestData["last_name"], $requestData["email"], $requestData["ip_address"])) {
        //     $error = ["error" => $requestData];
        //     sendJSON($error, 400);
        // }

        // $first_name = $requestData["first_name"];
        // $last_name = $requestData["last_name"];
        // $email = $requestData["email"];
        // $ip_address = $requestData["ip_address"];
    
        // $heighestId = 0;

        // //  ta reda på det hösta id 
        // foreach ($database as $user) {
        //     // om id är mer än det högsta id vi hittat 
        //     // sätter vi det gösta id till user id 
        //     if ($user["id"] > $heighestId) {
        //         $heighestId = $user["id"];
        //     }
        // }

        // $nextId = $heighestId + 1;
        // $new_User = ["id" => $nextId, "first_name" => $first_name, "last_name" => $last_name, "email" => $email, "ip_address" => $ip_address];

        // // stoppar in den nya hunden i arrayen 
        // $database[] = $new_User;
        // $json = json_encode($database, JSON_PRETTY_PRINT);

        // // finns inte filen så skapas den. 
        // file_put_contents($file_Name, $json);

        // sendJSON($new_User);
    }
?>