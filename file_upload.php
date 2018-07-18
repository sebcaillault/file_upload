<?php

$filesName = $_FILES["file"]["name"]; // file name
$fileTmpLocation = $_FILES["file"]["tmp_name"]; // file in the php temporary folder
$fileType = $_FILES["file"]["type"];
$fileSize = $_FILES["file"]["size"];
$fileErrMessage = $_FILES["file"]["error"]; // 0 for false / 1 for true

if (!$fileTmpLocation) // if no file is submitted to the form
{                    
    echo "Error: no file submitted";
    exit();
}

if (move_uploaded_file($fileTmpLocation, "img_uploads/$filesName"))
{
    echo "$filesName has been uploaded successfully";
}
else
{
    echo "move to uploaded files has failed";
}
