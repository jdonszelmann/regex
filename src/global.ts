import {writable} from "svelte/store";
import {Levels} from "./leveldb";
import {Level} from "./level";

export const CompletedLocalStorageIdentifier = "completed";

function FirstLevel(): number | null {
    let smallest = null;
    let total_smallest = null;

    for (const l of Levels) {
        if (!l.Completed) {
            if (smallest === null) {
                smallest = l.display_id
            } else {
                smallest = Math.min(l.display_id, smallest)
            }
        }

        if (total_smallest === null) {
            total_smallest = l.display_id
        } else {
            total_smallest = Math.min(l.display_id, total_smallest)
        }
    }

    if (smallest === null) {
        return total_smallest;
    } else {
        return smallest;
    }
}

export const CurrentLevel = writable(FirstLevel())

export function SetLevel(level_id: number) {
    CurrentLevel.update(_ => level_id)
}

export function GetLevelByDisplayId(display_id: number): Level | null {
    for (const l of Levels) {
        if (l.display_id === display_id) {
            return l;
        }
    }

    return null;
}

export function GetLevelById(id: number): Level | null {
    for (const l of Levels) {
        if (l.id === id) {
            return l;
        }
    }

    return null;
}

export function CompletedLevel(level: Level) {
    const storage = window.localStorage;
    const completed = storage.getItem(CompletedLocalStorageIdentifier)
    if (completed === null) {
        storage.setItem(CompletedLocalStorageIdentifier, JSON.stringify([level.id]))
    } else {
        const completedList = JSON.parse(completed);
        if (!completedList.includes(level.id)) {
            completedList.push(level.id);
        }
        storage.setItem(CompletedLocalStorageIdentifier, JSON.stringify(completedList));
    }
}

export function NextLevelAndComplete() {
    CurrentLevel.update(current => {
        const level = GetLevelByDisplayId(current);
        CompletedLevel(level);

        let next = null;
        for (const l of Levels) {
            if (l.display_id > current) {
                if (next === null) {
                    next = l.display_id;
                } else {
                    next = Math.min(l.display_id, next);
                }
            }
        }

        if (next === null) {
            next = FirstLevel()
        }

        return next
    })
}