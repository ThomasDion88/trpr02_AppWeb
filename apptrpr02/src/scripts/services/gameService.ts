export type Ship = {
    id: number,
    name: string,
}

export type Score = {
    id: number,
    name: string,
    score: number,
}

export type Character = {
    id: number,
    name: string,
    credit: number,
    experience: number,
    ship: {
        id: number,
        name: string,
        vitality: number
      },
}

export async function fetchAllShips(): Promise<Ship[]> {
    let response = await fetch("http://127.0.0.1:3000/ships");
    let ships = await response.json();
    return ships;
}

export async function fetchFiveRandomCharacters(): Promise<Character[]> {
    let response = await fetch("http://127.0.0.1:3000/characters");
    let characters = await response.json();
    
    for (let i = characters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [characters[i], characters[j]] = [characters[j], characters[i]];
    }

    return characters.slice(0, 5);
}

export async function fetchShipById(id: number): Promise<Ship | undefined> {
    const ships = await fetchAllShips();
    const ship = ships.find(ship => ship.id === id);
    return ship;
}

export async function fetchAllScores(): Promise<Score[]> {
    let response = await fetch("http://127.0.0.1:3000/ranking");
    let scores = await response.json();
    return scores;
}