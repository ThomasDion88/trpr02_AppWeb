export type Ship = {
    id: number,
    name: string,
};

export type Score = {
    id: number,
    name: string,
    score: number,
};

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
};

const experienceLevels: { [key: number]: string } = {
    1: 'Débutant',
    2: 'Confirmé',
    3: 'Expert',
    4: 'Maître'
};

export async function convertExperienceLevel(level: number): Promise<string> {
    return experienceLevels[level] || 'Inconnu';
};

export async function handleHealthPercentage(currentHealth: number, initialHealth: number): Promise<number> {
    return ((currentHealth * 100) / initialHealth)
};

export async function fetchAllShips(): Promise<Ship[]> {
    let response = await fetch("http://127.0.0.1:3000/ships");
    let ships = await response.json();
    return ships;
};

export async function fetchFiveRandomCharacters(): Promise<Character[]> {
    let response = await fetch("http://127.0.0.1:3000/characters");
    let characters = await response.json();
    
    for (let i = characters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [characters[i], characters[j]] = [characters[j], characters[i]];
    }

    return characters.slice(0, 5);
};

export async function fetchShipById(id: number): Promise<Ship | undefined> {
    const ships = await fetchAllShips();
    const numId = Number(id);
    const ship = ships.find(ship => ship.id === numId);
    return ship;
};

export async function fetchAllScores(): Promise<Score[]> {
    let response = await fetch("http://127.0.0.1:3000/ranking");
    let scores = await response.json();
    return scores;
};

export async function fetchShipVitality(shipId: number): Promise<number> {
    let response = await fetch("http://127.0.0.1:3000/characters");
    let characters = await response.json();

    const id = Number(shipId);

    for (const character of characters) {
        if (character.ship.id === id) {
            return character.ship.vitality;
        }
    }

    return 0;
};