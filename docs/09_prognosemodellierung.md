# 09 – Prognosemodellierung exogener Einflussgrößen

## Ziel

Modellierung und Prognose exogener Einflussgrößen, die unternehmerische Kennzahlen beeinflussen, aufbauend auf erschlossenen Wissensbeständen.

## Exogene Einflussgrößen (Beispiele)

Konjunktur und Wirtschaft, Zinsen und Finanzmärkte, Rohstoff- und Energiepreise, Demografie und Gesellschaft, Politik und Regulierung sowie weitere domänenspezifische Faktoren.

## Vorgehen

1. **Faktorauswahl** – Identifikation relevanter exogener Variablen.
2. **Datenaufbereitung** – Zeitreihenbildung, Behandlung fehlender Werte.
3. **Modellierung** – klassische und ML-basierte Verfahren (konfigurierbar).
4. **Prognose** – Punkt- und Szenarioprognosen (z. B. Szenario A/B).
5. **Bewertung** – Gütemetriken und Sensitivitätsanalysen.

## Entscheidungsunterstützung

Szenario- und What-if-Simulationen, Einfluss- und Sensitivitätsanalysen sowie Risikobewertung als Grundlage nachvollziehbarer Empfehlungen.

## Metriken

MAE, RMSE, MAPE und Directional Accuracy (Details in `11_evaluation.md`).

## Code- und Konfigurationsbezug

- Code: `src/rag_framework/forecasting/`
- Konfiguration: `configs/forecasting.yaml`
- Experiment: `notebooks/07_forecasting_exogenous_factors.ipynb`

> Diese Datei dokumentiert das Prognosekonzept. Es werden keine Prognoseergebnisse erfunden; konkrete Modelle und Auswertungen entstehen in Code und Notebooks.
