Geeft Homey de mogelijkheid om JavaScript logic te gebruiken in de Flow kaarten.

Acties:
- Krijg opgemaakte datum: Voegt de opgemaakte datum toe aan de algemene tag 'Opgemaakte datum' :: DEPRECATED
- Opgemaakte datum en tijd ophalen :: Voegt de opgemaakte datum toe aan de globale tag 'Geformatteerde datum en tijd'

Condities:
- Controleer of de opgegeven waarde gelijk is aan één van de waarden in een reeks
- Controleer of de opgegeven waarde één van de waarde in een reeks bevat
- Controleer of de opgegeven waarde leeg is
- Controleer of de opgegeven lengte waarde minder is dan een specifiek aantal
- Controleer of de opgegeven datum voor een datum is
- Controleer of de opgegeven tijd voor een tijd is
- Controleer of de opgegeven datum/tijd voor een datum/tijd is
- Willekeurig (waar | onwaar)
- Het Dagnummer ligt (tussen|niet tussen)
- De Maand is (tussen|niet tussen)
- Controleer of de dag van de week gelijk is aan één van de specifiek dagen van de week

Triggers
- Datum en maand worden :: Wordt geactiveerd wanneer de huidige datum verandert in de gekozen datum en maand (00:00)

Hoofdlettergevoeligheid

In de volgende condities kan je kiezen of je hoofdlettergevoeligheid aan of uit zet:
- 'Waarde bevat één van de...'
- 'Is waarde exact één van de...'

    Wanneer hoofdlettergevoeligheid aan staat
        Waarde en reeks zullen behandeld worden zoals ze zijn

    Wanneer hoofdlettergevoeligheid uit staat
        Waarde en reeks zullen behandeld worden als kleine letters
