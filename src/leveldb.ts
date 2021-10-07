import {Level} from "./level";


function getLevels(): Level[] {
    const levels = [];

    let display_id = 1;

    levels.push(new Level(
        1, display_id++,
        "Amsterdam",
        [
            {sentence: "Amsterdam", should_match: true},
            {sentence: "Rotterdam", should_match: false},
            {sentence: "Schiedam", should_match: false},
            {sentence: "Zaandam", should_match: false},
            {sentence: "Delft", should_match: false},
            {sentence: "Den Haag", should_match: false},
        ]
    ));

    levels.push(new Level(
        5, display_id++,
        "Dam",
        [
            {sentence: "Amsterdam", should_match: true, substring: [6,9]},
            {sentence: "Rotterdam", should_match: true, substring: [6,9]},
            {sentence: "Schiedam", should_match: true, substring: [5,8]},
            {sentence: "Zaandam", should_match: true, substring: [4,7]},
            {sentence: "Delft", should_match: false},
            {sentence: "Den Haag", should_match: false},
        ]
    ));

    levels.push(new Level(
        2, display_id++,
        "hond of kat",
        [
            {sentence: "Bo: Zwarte hond, houd van rennen.", should_match: true, substring: [11, 15]},
            {sentence: "Vlokje: Witte kat, heel lief.", should_match: true, substring: [14, 17]},
            {sentence: "Lizzy: Gevlekte kat, geeft kopjes.", should_match: true, substring: [16, 19]},
            {sentence: "Max: Bruine hond, kan een frisbee vangen.", should_match: true, substring: [12, 16]},
            {sentence: "Rocky: Zwarte hond, slaapt de hele dag.", should_match: true, substring: [14, 18]},
            {sentence: "Sally: Grijze kat, vangt vogels.", should_match: true, substring: [14, 17]},
            {sentence: "Abu: Rode kat, klimt soms in een boom.", should_match: true, substring: [10, 13]},
            {sentence: "pitou: Witte hond, zou nooit iemand bijten hoor.", should_match: true, substring: [13, 17]},
            {sentence: "Beertje: Lapjes kat, verstopt zich.", should_match: true, substring: [16, 19]},
        ]
    ));

    levels.push(new Level(
        6, display_id++,
        "bab",
        [
            {sentence: "bb", should_match: true},
            {sentence: "bab", should_match: true},
            {sentence: "baab", should_match: true},
            {sentence: "baaab", should_match: true},
            {sentence: "babab", should_match: true, substring:[0,3]},
            {sentence: "bacab", should_match: false},
            {sentence: "abbba", should_match: true, substring:[1,3]},
            {sentence: "ababa", should_match: true, substring:[1,4]},
        ]
    ));

    levels.push(new Level(
        7, display_id++,
        "bab",
        [
            {sentence: "bb", should_match: false},
            {sentence: "bab", should_match: true},
            {sentence: "baab", should_match: true},
            {sentence: "baaab", should_match: true},
            {sentence: "babab", should_match: true, substring:[0,3]},
            {sentence: "bacab", should_match: false},
            {sentence: "abbba", should_match: false},
            {sentence: "ababa", should_match: true, substring:[1,4]},
        ]
    ));

    levels.push(new Level(
        11, display_id++,
        "ab",
        [
            {sentence: "ab", should_match: true},
            {sentence: "ba", should_match: false},
            {sentence: "abab", should_match: true},
            {sentence: "ababab", should_match: true},
            {sentence: "abababab", should_match: true},
            {sentence: "acacacac", should_match: false},
        ]
    ));

    levels.push(new Level(
        13, display_id++,
        "alles",
        [
            {sentence: "ab", should_match: true},
            {sentence: "09", should_match: true},
            {sentence: "tovenaar", should_match: true},
            {sentence: "alles", should_match: true},
            {sentence: "negenennegentig", should_match: true},
            {sentence: "tim", should_match: true},
            {sentence: "paul", should_match: true},
            {sentence: "pizza", should_match: true},
            {sentence: "appelsap", should_match: true},
        ]
    ));

    levels.push(new Level(
        8, display_id++,
        "lage getallen",
        [
            {sentence: "2", should_match: true},
            {sentence: "22", should_match: true},
            {sentence: "33", should_match: true},
            {sentence: "444", should_match: true},
            {sentence: "55", should_match: false},
            {sentence: "6", should_match: false},
            {sentence: "666", should_match: false},
            {sentence: "667", should_match: false},
            {sentence: "123", should_match: true},
            {sentence: "123123123123", should_match: true},
            {sentence: "0", should_match: true},
            {sentence: "789", should_match: false},
        ]
    ));

    levels.push(new Level(
        12, display_id++,
        "abegin",
        [
            {sentence: "ab", should_match: true},
            {sentence: "ba", should_match: false},
            {sentence: "abab", should_match: true},
            {sentence: "ababab", should_match: true},
            {sentence: "abababab", should_match: true},
            {sentence: "cabababab", should_match: false},
        ]
    ));

    levels.push(new Level(
    3, display_id++,
    "06-nummers",
    [
        {sentence: "06-25658631", should_match: true},
        {sentence: "06-51239755", should_match: true},
        {sentence: "020-6852011", should_match: false},
        {sentence: "015-5190110", should_match: false},
        {sentence: "06-80768578", should_match: true},
        {sentence: "015-5080109", should_match: false},
        {sentence: "015-1765344", should_match: false},
        {sentence: "06-36283793", should_match: true},
        {sentence: "06-66455683", should_match: true},
        {sentence: "06-80971733", should_match: true},
        {sentence: "015-2671241", should_match: false},
        {sentence: "015-4383208", should_match: false},
        {sentence: "020-2437494", should_match: false},
        {sentence: "06-87099489", should_match: true},
        {sentence: "015-8703075", should_match: false},
        {sentence: "015-2959782", should_match: false},
        {sentence: "020-8330043", should_match: false},
        {sentence: "06-0a876166", should_match: false},
        {sentence: "020-0269343", should_match: false},
        {sentence: "015-0146562", should_match: false},
       ]
    ));

    levels.push(new Level(
        10, display_id++,
        "muzieknamen",
        [
            {sentence: "A", should_match: true},
            {sentence: "B", should_match: true},
            {sentence: "C", should_match: true},
            {sentence: "D", should_match: true},
            {sentence: "E", should_match: true},
            {sentence: "F", should_match: true},
            {sentence: "G", should_match: true},
            {sentence: "H", should_match: false},
            {sentence: "g", should_match: true},
            {sentence: "Gmaj", should_match: true},
            {sentence: "Gmin", should_match: true},
            {sentence: "Amin", should_match: true},
            {sentence: "Fm", should_match: true},
            {sentence: "Gmaj7", should_match: true},
            {sentence: "G7", should_match: true},
            {sentence: "B9", should_match: true},
        ]
    ));

    levels.push(new Level(
        9, display_id++,
        "kommagetallen",
        [
            {sentence: "123", should_match: false},
            {sentence: "12345", should_match: false},
            {sentence: "0", should_match: false},
            {sentence: "1", should_match: false},
            {sentence: "987654321", should_match: false},
            {sentence: "3.5", should_match: true},
            {sentence: "3.05", should_match: true},
            {sentence: "03.05", should_match: true, substring:[1,5]},
            {sentence: "30.05", should_match: true},
            {sentence: "-30.05", should_match: true},
            {sentence: "300.", should_match: true},
            {sentence: "-300.", should_match: true},
            {sentence: ".1", should_match: true},
            {sentence: "-.1", should_match: true},
            {sentence: ".001", should_match: true},
            {sentence: "-", should_match: false},
        ]
    ));

    levels.push(new Level(
        4, display_id++,
        "e mail",
        [
            {sentence: "Hey! Kan je voor vanavond pizza bestellen?", should_match: false},
            {sentence: "Je kan info@pizza.com een mail sturen.", should_match: true, substring: [7, 21]},
            {sentence: "Vraag je ook aan Timon wat voor pizza hij wil?", should_match: false},
            {sentence: "Hem kan je op timon@gmail.com bereiken.", should_match: true, substring: [14, 29]},
            {sentence: "Laten we om 7 uur afspreken @mijn huis.", should_match: false},
            {sentence: "Maddie komt wat later.", should_match: false},
            {sentence: "Voor haar bestel ik op bol.com een hoed.", should_match: false},
            {sentence: "Ik hoop dat ze die leuk vind.", should_match: false},
            {sentence: "Anders vraag ik weinig@watkanjewel.nl om een leuker kadeau te bedenken.", should_match: true, substring: [16, 37]},
            {sentence: "Misschien is een hoed op een pizza feestje wel raar he?", should_match: false},
            {sentence: "Nou, dan bestel ik wel sokken.", should_match: false},
            {sentence: "Ik heb er zin in!", should_match: false},
            {sentence: "'verstuurd vanaf: tessa@hotmail.com'", should_match: true, substring: [18, 35]},
        ]
    ));




    for (const i of levels) {
        for (const j of levels) {
            if (i !== j && (i.id === j.id || i.display_id === j.display_id)) {
                throw new Error("Some ids or display ids are registered more than once");
            }
        }
    }

    return levels;
}

export const Levels = getLevels();