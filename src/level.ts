import {CompletedLocalStorageIdentifier} from "./global";

interface Test {
    sentence: string
    should_match: boolean

    substring ?: [number, number]
}

export class Level {
    id: number
    display_id: number

    name: string

    tests: Test[]

    constructor(
        id: number,
        display_id: number,
        name: string,
        tests: Test[]
    ) {
        this.id = id;
        this.display_id = display_id;
        this.name = name;
        this.tests = tests
    }

    get Completed(): boolean {
        const storage = window.localStorage;
        const completed = storage.getItem(CompletedLocalStorageIdentifier);

        if (completed === null) {
            return false;
        } else {
            const completed_arr: number[] = JSON.parse(completed);
            return completed_arr.includes(this.id)
        }
    }

}

