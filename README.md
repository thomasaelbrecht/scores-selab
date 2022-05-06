# SELab scores

Dit script verzamelt alle scores voor SELab per groep. Het script vereist één argument: het pad naar een map met Markdown-bestanden per opdracht (extensie `.md`). Zie verder voor uitleg over de opbouw van deze bestanden.

## Requirements

- NodeJS v17.x ([nodejs.org](https://nodejs.org))
- pnpm ([pnpm.io](https://pnpm.io))

## Setup

Clone deze repository en installeer de dependencies

```bash
pnpm install
```

Start het script en geef het pad naar de score-bestanden op:


```bash
pnpm start "<HET PAD>"
```

Het script genereert een bestand met als naam `scores.csv`. Dit bevat alle scores per groep en opdracht, gesorteerd op groepsnaam.

## Opmaak score-bestand

Elk Markdown-bestand heeft een vaste opmaak:

- Eerste lijn bevat een hoofding niveau 1 met de opdracht.
- Een hoofding niveau 2 per groep
- Per groep een quote met de score

Zie onderstaand voorbeeld:

```markdown
# Opdracht x

## Gxx

> SCORE

## Gyy

> SCORE
```

Het script gaat ervan uit dat het bestand deze volgorde strikt hanteert. Bijvoorbeeld: een ontbrekende score resulteert in een ontbrekende groep en bijgevolg wordt de opdracht niet getoond in de uitvoer.

## Problemen

Raadpleeg het `debug.log` bestand om te controleren wat er precies ingelezen werd. Aan de hand van dit bestand zie je per opdracht welke groep welke score kreeg.