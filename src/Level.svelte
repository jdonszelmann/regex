<script lang="ts">
    import {CurrentLevel, GetLevelByDisplayId, NextLevelAndComplete} from "./global";
    import {onMount} from "svelte";
    import {Level} from "./level";

    interface Match {
        start: number | null
        end: number | null
        messages: string[]
    }

    let Level: Level = null;
    let mounted = false;

    let matches: Match[][] = [];
    let correct: boolean[] = [];
    let donedialog = false;

    let inputValue;
    let previousInput;

    $: {
        const NewLevel = GetLevelByDisplayId($CurrentLevel);
        if (Level === null || NewLevel.display_id !== Level.display_id) {
            matches = []
            for (const i of NewLevel.tests) {
                matches.push([])
            }
            matches = matches;

            correct = []
            for (const i of NewLevel.tests) {
                correct.push(false)
            }
            correct = correct;

            donedialog = false;

            Level = NewLevel;

            inputValue = "";
            previousInput = "";
        }


        if (mounted) {
            (document.getElementById("input") as HTMLInputElement).focus();
            inputChanged();
        }
    }

    async function inputChanged() {
        if (previousInput == inputValue) {
            return;
        }
        previousInput = inputValue;

        let exp;
        try {
            exp = new RegExp(inputValue, "g");
        } catch (SyntaxError) {
            console.log("syntax error")
            return
        }

        for (let i = 0; i < Level.tests.length; i++) {
            const test = Level.tests[i];
            const matched = test.sentence.matchAll(exp);

            matches[i] = [];
            for (const match of matched) {
                if (match[0].length === 0) {
                    continue;
                }

                matches[i].push({
                    start: match.index,
                    end: match.index + match[0].length,
                    messages: []
                });
            }

            let substring = test.substring;
            const do_substring = substring !== null &&
                typeof substring !== "undefined" &&
                test.should_match &&
                substring[0] < substring[1]

            if (!do_substring) {
                substring = [0, test.sentence.length]
            }

            console.log(matches, substring)

            correct[i] = (
                matches[i].length == 1 &&
                test.should_match &&
                matches[i][0].start == substring[0] &&
                matches[i][0].end == substring[1]
            ) || (
                matches[i].length == 0 &&
                !test.should_match
            );
        }

        matches = matches;

        if (!correct.some(i => !i)) {
            Done()
        }
    }

    function Done() {
        donedialog = true;
    }

    async function MatchParts(s: string, test_index: number): Promise<[string, boolean, boolean, boolean, boolean, boolean][]> {
        let substring = Level.tests[test_index].substring;
        const do_substring = substring !== null &&
            typeof substring !== "undefined" &&
            Level.tests[test_index].should_match &&
            substring[0] < substring[1]

        const parts = []
        let last_end = 0;
        let selected = false;

        for (const m of matches[test_index]) {
            if (m.start === m.end) {
                continue;
            }

            if (do_substring && substring[0] > last_end && m.start > substring[0]) {
                parts.push([s.slice(last_end, substring[0]), false, false, false, false, false]);
                selected = true;
                last_end = substring[0];
            }

            if (do_substring && substring[1] > last_end && m.start > substring[1]) {
                parts.push([s.slice(last_end, substring[1]), false, false, false, false, true]);
                selected = false;
                last_end = substring[1];
            }

            if (m.start > last_end) {
                parts.push([s.slice(last_end, m.start), false, false, false, false, selected]);
            }

            if (do_substring && m.start == substring[0] && m.end == substring[1]) {
                parts.push([s.slice(m.start, m.end), true, false, false, false, true]);
            } else if (do_substring && m.start == substring[0] && substring[1] > m.end) {
                parts.push([s.slice(m.start, m.end), true, false, false, false, true]);
                selected = true
            } else if (do_substring && m.start == substring[0] && m.end > substring[1]) {
                parts.push([s.slice(m.start, substring[1]), false, true, false, false, true]);
                parts.push([s.slice(substring[1], m.end), false, false, false, true, false]);
            } else if (do_substring && substring[0] > m.start && m.end == substring[1]) {
                parts.push([s.slice(m.start, substring[0]), false, true, false, false, false]);
                parts.push([s.slice(substring[0], m.end), false, false, false, true, true]);
            } else if (do_substring && m.start > substring[0] && m.end == substring[1]) {
                // parts.push([s.slice(substring[0], m.start), false, false, false, false, true]);
                parts.push([s.slice(m.start, m.end), true, false, false, false, true]);
                selected = false;
            }  else if (do_substring &&
                substring[0] > m.start && m.end > substring[0] &&
                substring[1] > m.start && m.end > substring[1]
            ) {
                parts.push([s.slice(m.start, substring[0]), false, true, false, false, false]);
                parts.push([s.slice(substring[0], substring[1]), false, false, true, false, true]);
                parts.push([s.slice(substring[1], m.end), false, false, false, true, false]);

            } else if (do_substring && substring[0] > m.start && m.end > substring[0]) {
                parts.push([s.slice(m.start, substring[0]), false, true, false, false, false]);
                parts.push([s.slice(substring[0], m.end), false, false, false, true, true]);

                selected = true;
            } else if (do_substring && substring[1] > m.start && m.end > substring[1]) {
                parts.push([s.slice(m.start, substring[1]), false, true, false, false, true]);
                parts.push([s.slice(substring[1], m.end), false, false, false, true, false]);

                selected = false;
            } else {
                parts.push([s.slice(m.start, m.end), true, false, false, false, selected]);
            }
            last_end = m.end;
        }

        if (last_end < s.length) {
            if (do_substring && substring[0] > last_end && s.length  > substring[0]) {
                parts.push([s.slice(last_end, substring[0]), false, false, false, false, false]);
                selected = true;
                last_end = substring[0];
            }

            if (do_substring && substring[1] > last_end && s.length > substring[1]) {
                parts.push([s.slice(last_end, substring[1]), false, false, false, false, true]);
                selected = false;
                last_end = substring[1];
            }

            parts.push([s.slice(last_end, s.length), false, false, false, false, selected])
        }


        if (!do_substring && Level.tests[test_index].should_match) {
            for (let i = 0; i < parts.length; i++) {
                parts[i][5] = true;
            }
        }

        return parts;
    }


    onMount(() => {
        mounted = true;
        (document.getElementById("input") as HTMLInputElement).select();
    })

</script>

<div class="level">
    <h1>{Level.name}</h1>
    <div class="tests">
        {#each Level.tests as test, index}
            <span class="test">
                {#if correct[index]}
                    ✅
                {:else}
                    ❌
                {/if}

                {#await MatchParts(test.sentence, index)}
                    <span class="matchpart">{test.sentence}</span>
                {:then value}
                    {#each value as part}
                        <span class="matchpart"
                              class:highlighted={part[1]}
                              class:highlightleft={part[2]}
                              class:highlightmiddle={part[3]}
                              class:highlightright={part[4]}
                              class:should_match={part[5]}
                        >{part[0]}</span>
                    {/each}
                {/await}
            </span>
        {/each}
    </div>
    <input id="input" type="text" autocomplete="off" on:keyup={inputChanged} bind:value={inputValue}>
</div>

{#if donedialog}
    <div class="donedialog">
        <div class="box">
            <h1>Correct</h1>

            <button on:click={NextLevelAndComplete}>Next Level</button>
        </div>
    </div>
{/if}


<style>
    .donedialog {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        position: fixed;
        top: 0;
        left: 0;
    }

    .donedialog .box {
        background: #393D3F;

        color: white;

        width: min(40em, 100vw);
        height: min(30em, 100vh);

        display: flex;
        flex-direction: column;
        align-items: center;

        padding: 4px;
    }

    .donedialog .box button {
        margin-top: auto;
        margin-bottom: auto;
        font-size: 2em;
        cursor: pointer;

        background: #979B8D;
    }

	.level {
        width: min(90vw, 50em);

        display: flex;
        flex-direction: column;
        align-items: center;

        height: 100%;

        margin-bottom: 2em;
    }

    .test {

    }


    .highlighted {
        border-radius: .25em;
        border: 1px solid gray;
        background: greenyellow;
    }


    .highlightleft {
        border-top-left-radius: .25em;
        border-bottom-left-radius: .25em;
        border: 1px solid gray;
        border-right: none;
        background: greenyellow;
    }
    .highlightright {
        border-top-right-radius: .25em;
        border-bottom-right-radius: .25em;
        border: 1px solid gray;
        border-left: none;
        background: greenyellow;
    }
    .highlightmiddle {
        border: 1px solid gray;
        border-left: none;
        border-right: none;
        background: greenyellow;
    }

    .should_match {
        color: #ff3e00;
    }

    .tests {

        background: #979B8D;
        border-radius: 1em;
        padding: 2em;
        box-sizing: border-box;

        color: black;
        font-size: 1.4em;

        flex-grow: 1;

        width: 100%;

        margin-bottom: 1em;
        margin-top: 1em;

        display: flex;
        flex-direction: column;
    }

    #input {
        border: 1px solid black;

        font-size: 2em;
        text-align: center;

        margin: 0;
        padding: .5em;
        width: 100%;

        outline: none;

        background: #979B8D;
    }

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
</style>