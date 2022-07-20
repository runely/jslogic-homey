Gir Homey muligheten til å bruke JavaScript logikk gjennom flytkort

Actions:
- Hent formatert dato :: Legger den formatterte datoen i den globale taggen 'Formatert dato'

Conditions:
- Sjekk om angitt tekst er helt lik en av listeverdiene
- Sjekk om angitt tekst inneholder en av listeverdiene
- Sjekk om angitt tekst er tom
- Sjekk om lengden på angitt tekst er lenger enn angitt makslengde
- Sjekk om angitt dato er før dato
- Sjekk om angitt tid er før tid
- Sjekk om angitt dato/tid er før dato/tid
- Tilfeldig (sann|usann)
- Dagsnummeret er (mellom|ikke mellom)
- Måneden er (mellom|ikke mellom)
- Sjekk om ukedagen er lik en av de angitte ukedagene

Triggers
- Dagen og måneden blir :: Triggers når dagens dato endres til valgt dag og måned (00:00)

Skiller på store og små bokstaver

I de følgende conditions kan du velge å skille på store og små bokstaver eller ikke:
- 'Tekst inneholder en av...'
- 'Er tekst helt lik en av...'

    Skiller på store og små bokstaver
        Tekst og liste blir sjekket slik de er angitt

    Skiller ikke på store og små bokstaver
        Tekst og liste blir endret til små bokstaver
