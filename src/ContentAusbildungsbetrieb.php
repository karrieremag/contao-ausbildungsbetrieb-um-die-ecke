<?php

declare(strict_types=1);

namespace Karrieremag\AudeBundle;

use Contao\BackendTemplate;
use Contao\ContentElement;
use Contao\System;

/**
 * Inhaltselement „Ausbildungsbetrieb um die Ecke“ (Contao 4.13 und 5).
 */
class ContentAusbildungsbetrieb extends ContentElement
{
    protected $strTemplate = 'ce_ausbildungsbetrieb';

    public static function einstellung($roh): array
    {
        $j = json_decode(html_entity_decode((string)$roh, ENT_QUOTES, 'UTF-8'), true);
        return is_array($j) ? $j : [];
    }

    public function generate()
    {
        $scope = System::getContainer()->get('contao.routing.scope_matcher');
        $request = System::getContainer()->get('request_stack')->getCurrentRequest();
        if ($request && $scope->isBackendRequest($request)) {
            $e = self::einstellung($this->aude_einstellung);
            $t = new BackendTemplate('be_wildcard');
            $t->wildcard = '### AUSBILDUNGSBETRIEB UM DIE ECKE ###';
            $t->title = trim(($e['firma'] ?? '') . ' ' . ($e['ort'] ?? ''));
            return $t->parse();
        }
        return parent::generate();
    }

    protected function compile()
    {
        $e = self::einstellung($this->aude_einstellung);
        $this->Template->html = \AudeAusgabe::html($e, __DIR__ . '/Resources/public/vorlagen.json');
        if ($this->Template->html !== '' && \AudeAusgabe::brauchtSkript($e)) {
            $pfad = 'bundles/karrieremagaude/';
            $GLOBALS['TL_BODY']['aude'] = '<script>window.DAPW_MAPLIBRE={"js":"' . $pfad . 'maplibre-gl.js","css":"' . $pfad . 'maplibre-gl.css"};</script>'
                . '<script src="' . $pfad . 'widget.js" defer></script>';
        }
    }
}
