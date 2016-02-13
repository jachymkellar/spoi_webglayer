<?php

// php.ini
// memory_limit = -1
// max_execution_time = -1
// restart Apache
// httpd.exe -k restart -n "Apache24_php56"

    echo "Loading...<br><br>";

$rdf = file_get_contents('data/new_data/DE_OSM020.rdf');

$rdf = str_replace('poi:categoryWaze', 'poi_categoryWaze', $rdf);
$rdf = str_replace('rdf:Description', 'rdf_Description', $rdf);
$rdf = str_replace('geos:asWKT', 'geos_asWKT', $rdf);
$rdf = str_replace('rdf:about', 'rdf_about', $rdf);  
$rdf = str_replace('rdf:resource', 'rdf_resource', $rdf);
$rdf = str_replace('rdfs:label', 'rdfs_label', $rdf);
$rdf = new SimpleXMLElement($rdf);

  $soubor = fopen("data/new_data/data2.csv", "a");
  fwrite($soubor, "x,y,category\r\n");



foreach($rdf->rdf_Description as $node) {

    //echo $node->rdfs_label;
    //echo "<br>";
    $point = $node->geos_asWKT;
    //echo $point;
    //echo "<br>";
    
    if (substr($point, 0, 5 ) === "POINT"){
    $string = substr($point, 6);
    $length = strlen($string);
    $string2 = substr($string, 0, ($length-1));
    $rozdeleni = preg_split("/[\s,]+/",$string2);
    $x_data = $rozdeleni[0];
    $y_data = $rozdeleni[1];
    $x_mercator = lon2merc_x($x_data);
    $y_mercator = lat2merc_y($y_data);
    $x_pixel = merc2pixel_x($x_mercator);
    $y_pixel = merc2pixel_y($y_mercator);

    //echo $string."<br>";
    //echo $length."<br>";
    //echo $string2."<br>";
    //echo $x_data."<br>";
    //echo $y_data."<br>";
    //echo $x_mercator."<br>";
    //echo $y_mercator."<br>";
    //echo round($x_pixel,8)."<br>";
    //echo round($y_pixel,8)."<br>";
    fwrite($soubor, round($x_pixel,8).",".round($y_pixel,8).",");
    };
    
    $category = $node->poi_categoryWaze['rdf_resource'];
    //echo $category;
    
    if (substr( $category, 0, 41 ) === "http://www.openvoc.eu/waze_classification"){
    $string = substr($category, 42);
    if($string == 'Food_and_drink'){
      $string = "Food and Drink";
      $string = "3";
    }
    else if($string == 'Car_services'){
      $string = "Car Services";
      $string = "1";
    }
    else if($string == 'Culture_&_entertainment'){
      $string = "Culture & Entertainment";
      $string = "2";
    }
    else if($string == 'Natural_features'){
      $string = "Natural Features";
      $string = "5";
    }
    else if($string == 'Professional_and_public'){
      $string = "Professional and Public";
      $string = "8";
    }
    else if($string == 'Shopping_and_services'){
      $string = "Shopping and Services";
      $string = "9";
    }
    else if($string == 'Lodging'){
      $string = "Lodging";
      $string = "4";
    }
    else if($string == 'Other'){
      $string = "Other";
      $string = "6";
    }
    else if($string == 'Outdoors'){
      $string = "Outdoors";
      $string = "7";
    }
    else if($string == 'Transportation'){
      $string = "Transportation";
      $string = "10";
    }
    fwrite($soubor, $string."\r\n");
    //echo $string;
    //echo $value1."<br><br>";
    }

    
    //echo "<br><br>";

}

    echo "Done";

    function lon2merc_x($lon) { return deg2rad($lon) * 6378137.0; }
    function lat2merc_y($lat) { return log(tan(M_PI_4 + deg2rad($lat) / 2.0)) * 6378137.0; }
    function merc2pixel_x($merc_x){
      return (($merc_x + 20037508.34)/(20037508.342*2))*256;
    }
    function merc2pixel_y($merc_y){
      return ((-$merc_y-20037508.34)/(20037508.342*2))*256+256;
    }



?>