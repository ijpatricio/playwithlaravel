<?php

$window = new Vrzno;

$counter = $window->document->querySelector('#counter');
$incButton = $window->document->querySelector('#increment');
$decButton = $window->document->querySelector('#decrement');

$counter->innerHTML = $currentValue = 0;

$decrement = function () use (&$currentValue, $counter) {
    $currentValue--;
    $counter->innerHTML = $currentValue;
};

$increment = function () use (&$currentValue, $counter) {
    $currentValue++;
    $counter->innerHTML = $currentValue;
};

$incButton->addEventListener('click', $increment);
$decButton->addEventListener('click', $decrement);
