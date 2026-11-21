<?php

declare(strict_types=1);

namespace Karrieremag\AudeBundle;

use Contao\DataContainer;

/**
 * Zeigt im Backend unter dem (versteckten) Feld den Konfigurator: Betrieb suchen, Form, Farbe, Berufe, Vorschau.
 */
class Konfigurator
{
    public function anzeigen(DataContainer $dc): string
    {
        $pfad = 'bundles/karrieremagaude/';
        return '<div data-aude-konfigurator data-ziel="ctrl_aude_einstellung" data-basis="' . $pfad . '"></div>'
            . '<script>window.DAPW_MAPLIBRE={"js":"' . $pfad . 'maplibre-gl.js","css":"' . $pfad . 'maplibre-gl.css"};</script>'
            . '<script src="' . $pfad . 'widget.js" defer></script>'
            . '<script src="' . $pfad . 'konfigurator.js" defer></script>'
            . '<p class="tl_help tl_tip">Kostenlos von dein-ausbildungsplatz.de. Fragen: <a href="https://karrieremag.de/faq.html#siegel" target="_blank" rel="noopener">karrieremag.de/faq.html</a></p>';
    }
}
