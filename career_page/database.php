<?php

$host = "localhost";
$Username = "root";
$password = "";
$dbname = "testdatabase";

if (isset($_POST["first"])) {
    sleep(5);
    $conn = new mysqli($host, $Username, $password, $dbname);
    if ($conn->connect_error) {
        die("connection failed" . $conn->connect_error);
    }

    $first_name = $_POST['first'];
    $last_name = $_POST['last'];
    $email = $_POST['email'];
    $contact = $_POST['contact'];
    $address = $_POST['address'];
    $city = $_POST['city'];
    $province = $_POST['province'];
    $postal = $_POST['zip'];

    if ($first_name != '' && $last_name != '' && $email != '' && $contact != '' && $address != '' && $city != '' && $province != '' && $postal != '') {
        // Inserting the data

        $data = array(
            'First_name'   => $first_name,
            'Last_name'    => $last_name,
            'email'        => $email,
            'contact'      => $contact,
            'address'      => $address,
            'city'         => $city,
            'province'     => $province,
            'postal'       => $postal
        );

        $Q1 = "CREATE TABLE if not exists Applicants(First_name VARCHAR(10) NOT NULL, Last_name VARCHAR(10) NOT NULL,
                email VARCHAR(40) NOT NULL, contact INTEGER NOT NULL, address VARCHAR(40) NOT NULL, city VARCHAR(20) NOT NULL,
                province VARCHAR(20) NOT NULL, postal INTEGER NOT NULL)";
        $insert = "INSERT INTO Applicants(First_name,Last_name,email,contact,address,city,province,postal) VALUES ('$first_name','$last_name','$email','$contact','$address','$city','$province','$postal')";

        // $statement = $conn->prepare($insert);
        // $statement->bind_param("sssisssi",$first_name,$last_name,$email,$contact,$address,$city,$province,$postal);

        $readTable = "SELECT email FROM Applicants WHERE email = ?";
        $readData = $conn->prepare($readTable);
        $readData->bind_param("s",$email);
        $readData->execute();
        $result = $readData->get_result();
        $row = $result->fetch_assoc();
        if ($result->num_rows > 0){
            $success = '';
        }else{
            $statement = $conn->query($insert);
            $success = '<div class="alert alert-success">primary key constrain</div>';
        }       

    }

    $output= array (
        'success'   => $success
    );

    echo json_encode($output);

    $conn->close();

}



// if(!empty($first_name) || !empty($last_name) || !empty($email) || !empty($contact) || !empty($address) || !empty($city) || !empty($province) || !empty($postal)){
//     $host = "localhost";
//     $Username = "root";
//     $password = "root";
//     $dbname = "testdatabase";

//     $conn = new mysqli($host, $Username, $password, $dbname);

//     if(mysqli_connect_error()){
//         die('Connect Error('.mysqli_connect_errno().')'.mysqli_connect_error());   
//     }else{

//     }

// }else{
//     echo "All fields need values";
//     die();
// }




// <!-- "CREATE TABLE if not exists Users(user_name VARCHAR(50) PRIMARY KEY NOT NULL," \
//      " email VARCHAR(50) NOT NULL,password VARCHAR(8) NOT NULL, created datetime NOT NULL)" -->

?>

