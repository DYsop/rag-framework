# Beispielartefakte (`data/samples/`)

Dieses Verzeichnis enthaelt kleine, **anonymisierte** Beispielartefakte zur
Dokumentation der Inventarstruktur. Es dient ausschliesslich der
Nachvollziehbarkeit des Datenschemas und ersetzt **nicht** den vollstaendigen
Datenkoerper, der lokal verbleibt.

## Inhalt

| Datei                      | Zweck                                                       |
|----------------------------|-------------------------------------------------------------|
| `sample_inventory.csv`     | Repraesentativer Auszug (5–10 Zeilen) des Dokumentinventars |
| `sample_ground_truth.xlsx` | Auszug der Ground-Truth-Vorlage fuer die Evaluation         |

## Anonymisierung

Alle Beispielartefakte sind hinsichtlich lokaler oder privater Informationen
geprueft:

- Lokale Windows-Pfade (z. B. `C:\Users\...`) sind **entfernt bzw. relativiert**
  und durch repository-relative Pfade ersetzt, z. B.
  `data/raw/Rechnungslegung_Finanzberichte/beispiel.pdf`.
- Es sind keine vollstaendigen privaten Ordnerstrukturen enthalten.
- Es sind keine Roh-PDF-Inhalte enthalten.
- Die Zeilenzahl ist bewusst klein gehalten (5–10 Zeilen).

## Hinweis

`sample_inventory.csv` ist ein **abgeleitetes, anonymisiertes** Beispiel aus dem
vollstaendigen Inventarlauf `20260630_233607`. Der vollstaendige Inventarbestand
wird gemaess Git-Policy nicht versioniert (siehe `docs/results/README.md`).
