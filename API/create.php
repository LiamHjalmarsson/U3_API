<?php

    ini_set("display_errors", 1);

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

    $requestMethod = $_SERVER["REQUEST_METHOD"];
    
    if  ($requestMethod != "POST") {
        $error = ["error" => "Wrong http method need to us POST you are using $requestMethod!"];
        sendJSON($error, 405);
    } 

    if ($_POST["band"] == "" or $_POST["album"] == "") {
        $error = ["error" => "You did not use one of the input fileds (band or album)! Please try again"];
        sendJSON($error);
    }

    $band = strtolower($_POST["band"]); 
    $album = strtolower($_POST["album"]); 
    $genre = strtolower($_POST["genre"]); 
    $year = strtolower($_POST["year"]); 
        
    $heighst_Id = 0; 
        
    foreach ($database as $data) {

        if ($data["id"] > $heighst_Id) {
            $heighst_Id = $data["id"];
        }
        
        if ($data["album"] == $album) {
            $error = ["error" => "The album; $album already exists in database!"];
            sendJSON($error, 405);
        }

    }
    
    if ($_FILES["image"]["name"] == "") {
        
        $next_Id = $heighst_Id + 1;
        $new = ["id" => $next_Id, "band" => $band, "album" => $album, "songs" => [], "genre" => $genre, "year" => $year, "src" => ""];
                            
        $database[] = $new;
        $json = json_encode($database, JSON_PRETTY_PRINT);
        file_put_contents($file_Name, $json);
        sendJSON($new);

    } 

    $fiel_Source = $_FILES["image"]["tmp_name"];
    $new_file_Name = $_FILES["image"]["name"];
    $file_Size = $_FILES["image"]["size"];
    $file_Type = $_FILES["image"]["type"];
    
    $name_no_space = str_replace((" "), ("_"), ($new_file_Name));
        
    $timestamp = time();
        
    $destination = "uploades/$timestamp-$name_no_space";
        
    if ($file_Size > 350000) {
        $error = ["error" => "The size is to big $file_Size cant be bigger then 250000!"];
        sendJSON($error, 402);
    }
        
    if ($file_Type != "image/jpeg" and $file_Type != "image/jpg") {
        $error = ["error" => "The file format $file_Type is not allowed. Please us JPEG or JPG!"];
        sendJSON($error, 400);
    }

    if (move_uploaded_file($fiel_Source, $destination)) {
        $next_Id = $heighst_Id + 1;
        $new = ["id" => $next_Id, "band" => $band, "album" => $album, "songs" => [], "genre" => $genre, "year" => $year, "src" => $destination];
                            
        $database[] = $new;
        $json = json_encode($database, JSON_PRETTY_PRINT);
        file_put_contents($file_Name, $json);
        sendJSON($new);
    }

?>