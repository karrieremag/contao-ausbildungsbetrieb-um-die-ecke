<?php

$GLOBALS['TL_DCA']['tl_content']['palettes']['ausbildungsbetrieb'] = '{type_legend},type;{aude_legend},aude_einstellung;{protected_legend:hide},protected;{expert_legend:hide},guests,cssID;{invisible_legend:hide},invisible,start,stop';

$GLOBALS['TL_DCA']['tl_content']['fields']['aude_einstellung'] = [
    'exclude'   => true,
    'inputType' => 'textarea',
    'eval'      => ['decodeEntities' => true, 'style' => 'display:none', 'tl_class' => 'clr'],
    'wizard'    => [[\Karrieremag\AudeBundle\Konfigurator::class, 'anzeigen']],
    'sql'       => 'text NULL',
];
