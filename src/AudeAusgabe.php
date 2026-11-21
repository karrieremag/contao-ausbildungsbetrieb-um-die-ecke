<?php
/**
 * Ausbildungsbetrieb um die Ecke: HTML für Siegel, Widget, Banner und Textlink aus den gespeicherten Einstellungen.
 * Gemeinsam für WordPress, Contao und TYPO3. Copyright Karrieremag GmbH, Lizenz GPL-2.0-or-later.
 *
 * $e = ['code' => 'abc1234', 'sto' => '123-1', 'form' => 'gross|klein|siegel|banner|text', 'farbe' => 'hell|dunkel|durchsichtig',
 *       'berufe' => ['…'], 'firma' => '…', 'ort' => 'PLZ Ort']
 */
if (!class_exists('AudeAusgabe')) {
    final class AudeAusgabe
    {
        public static function html(array $e, string $vorlagenDatei): string
        {
            $code = preg_match('/^[a-z0-9]{5,12}$/', (string)($e['code'] ?? '')) ? (string)$e['code'] : '';
            if ($code === '') return '';
            $form = in_array($e['form'] ?? '', ['gross', 'klein', 'siegel', 'banner', 'text'], true) ? $e['form'] : 'gross';
            $farbe = in_array($e['farbe'] ?? '', ['hell', 'dunkel', 'durchsichtig'], true) ? $e['farbe'] : 'hell';
            $h = static function ($t): string { return htmlspecialchars((string)$t, ENT_QUOTES, 'UTF-8'); };
            $link = 'https://karrieremag.de/s/' . $code;
            $marke = '<a href="https://karrieremag.de/">karrieremag</a>';

            if ($form === 'gross' || $form === 'klein') {
                $berufe = array_slice(array_values(array_filter(array_map('strval', (array)($e['berufe'] ?? [])))), 0, 3);
                $sto = preg_match('/^\d{1,12}-\d{1,12}$/', (string)($e['sto'] ?? '')) ? ' data-sto="' . $h($e['sto']) . '"' : '';
                return '<div class="dap-siegel"' . $sto . ' data-theme="' . $farbe . '"' . ($form === 'klein' ? ' data-groesse="klein"' : '')
                    . ($berufe ? ' data-berufe="' . $h(implode('|', $berufe)) . '"' : '') . '>'
                    . '<a rel="nofollow" href="' . $link . '">Ausbildungsbetrieb um die Ecke</a> · ' . $marke . '</div>';
            }
            if ($form === 'siegel' || $form === 'banner') {
                $v = is_file($vorlagenDatei) ? (json_decode((string)file_get_contents($vorlagenDatei), true) ?: []) : [];
                $svg = (string)($v[$form . '-' . $farbe] ?? '');
                $k = static function (string $t, int $n): string { return mb_strlen($t) > $n ? rtrim(mb_substr($t, 0, $n - 1)) . '…' : $t; };
                $firma = (string)($e['firma'] ?? ''); $ort = (string)($e['ort'] ?? '');
                $svg = str_replace(['{{FIRMA}}', '{{ORT}}', '{{ZEILE}}'],
                    [$h($k($firma, 24)), $h($k($ort, 28)), $h($k($firma, max(8, 38 - mb_strlen($ort))) . ' · ' . $ort)], $svg);
                return '<a rel="nofollow" href="' . $link . '" style="display:inline-block;line-height:0">' . $svg . '</a><br><small>' . $marke . '</small>';
            }
            return 'Wir sind <a rel="nofollow" href="' . $link . '">Ausbildungsbetrieb um die Ecke</a>. <small>' . $marke . '</small>';
        }

        public static function brauchtSkript(array $e): bool
        {
            return in_array($e['form'] ?? 'gross', ['gross', 'klein'], true);
        }
    }
}
