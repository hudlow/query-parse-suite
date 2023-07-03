<?php

$parameters = new stdClass();;

foreach ($_GET as $param => $value) {
  if ($param === 'cast_to_boolean') {
    $value = boolval($value);
  } else if ($param === 'cast_to_integer') {
    $value = intval($value);
  } else if ($param === 'cast_to_float') {
    $value = floatval($value);
  } else if ($param === 'cast_to_date_time') {
    try {
      $value = date_create($value)->format('Y-m-d\TH:i:s.v\Z');
    } catch (Error $error) {
      $value = null;
    }
  }

  $parameters->$param = $value;
}

echo json_encode($parameters) . "\n";
