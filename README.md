# Ausbildungsbetrieb um die Ecke (Contao)

Kostenloses Azubi-Siegel für Ausbildungsbetriebe: Widget mit Karte (Map), Ihren Ausbildungsberufen und dem Weg mit Bus und Bahn, verlinkt auf Ihren Standort bei [dein-ausbildungsplatz.de](https://dein-ausbildungsplatz.de/). Auch als Siegel, Banner oder Textlink.

## Installation

Im Contao Manager nach „Ausbildungsbetrieb“ suchen und installieren, oder:

```
composer require karrieremag/contao-ausbildungsbetrieb-um-die-ecke
```

Danach die Datenbank aktualisieren.

## Einrichten

Neues Inhaltselement **Ausbildungsbetrieb um die Ecke** anlegen, Betrieb suchen, Form, Farbe und bis zu drei Berufe wählen, speichern. Fehlt Ihr Betrieb, tragen Sie ihn direkt im Element ein.

## Externe Dienste

* karrieremag.de (Karrieremag GmbH): Betriebssuche, Berufeliste und Kurzlink im Backend; im Frontend lädt das Widget den aktuellen Namen und die Adresse Ihres Standorts sowie die Berufeliste. Klicks werden mit Datum und Domain gezählt, ohne IP-Adressen. [Datenschutz](https://karrieremag.de/datenschutz.html)
* OpenFreeMap: Kartenbilder für das Widget, Kartendaten © OpenStreetMap. Dabei geht die IP-Adresse der Besucher an diesen Server. Nennen Sie das Widget in Ihrer Datenschutzerklärung.

MapLibre GL JS 4.7.1 (BSD-3-Clause) ist enthalten.

Fragen: https://karrieremag.de/faq.html#siegel

Lizenz: GPL-2.0-or-later, Karrieremag GmbH
