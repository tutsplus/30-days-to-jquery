<?php

$data = file( 'data.txt');
echo stripslashes( $data[0] );
