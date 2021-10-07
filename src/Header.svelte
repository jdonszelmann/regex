<script lang="ts">
    import {CurrentLevel, SetLevel} from "./global"
    import {Levels} from "./leveldb";

    let DisplayLevels = [];
    let cheatsheet = false;

    function openCheatsheet() {
        cheatsheet = true;
    }

    function closeCheatsheet() {
        cheatsheet = false;
    }

    CurrentLevel.subscribe(value => {
        DisplayLevels = Levels;
    })
</script>

<div class="header">
    <button class="cheatsheet" on:click = {openCheatsheet}>
        cheatsheet
    </button>
    <div class="progress">
        {#each DisplayLevels as level (level.id)}
            <div
                    class="levelprogress"
                    class:done={level.Completed}
                    class:current={level.display_id === $CurrentLevel}
                    on:click={SetLevel(level.display_id)}
            >
                {level.display_id}
            </div>
        {/each}
    </div>
</div>

{#if cheatsheet}
    <div class="cheatsheetdialog">
        <div class="box">
            <h1>Cheatsheet</h1>

            <div>
                <div><code>.</code> ieder karakter</div>
                <div><code>a</code> de letter a</div>
                <div><code>ab</code> a gevolgd door b</div>
                <div><code>a|b</code> a of b</div>
                <div><code>(ab)|(cd)</code> ab of cd</div>
                <div><code>ab|cd</code> eerst a, dan b of c, dan d</div>
                <div><code>\|</code> het karakter |</div>
                <div><code>a</code> de letter a</div>
                <div><code>^</code> start van tekst</div>
                <div><code>$</code> einde van tekst</div>
                <br>
                <div><code>a*</code> 0 of meer a's</div>
                <div><code>a+</code> 1 of meer a's</div>
                <div><code>a?</code> 0 of 1 a's</div>
                <div><code>a&#123;4&#125;</code> 4 a's</div>
                <div><code>a&#123;4,&#125;</code> 4 of meer a's</div>
                <div><code>a&#123;4,6&#125;</code> 4 tot 6 a's</div>
                <br>
                <div><code>[a-z]</code> letters a tot en met z</div>
                <div><code>[0-9]</code> letters 0 tot en met 9</div>
                <div><code>[A-Z]</code> hoofdletters A tot Z</div>
                <div><code>[abc]</code> a, b of c</div>
                <div><code>[^abc]</code> alles behalve a, b of c</div>
                <div><code>\s</code> een spatie of tab</div>
                <div><code>\S</code> alles behalve een spatie of tab</div>
            </div>

            <button on:click={closeCheatsheet}>Close</button>
        </div>
    </div>
{/if}


<style>
    .cheatsheetdialog {
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

    .cheatsheetdialog div {
        color: white;
        font-size: 1.1em;
    }

    .cheatsheetdialog div div {
        width: 100%;
        align-items: center;
        display: flex;
        flex-direction: column;
    }

    .cheatsheetdialog div div div {
        margin-top: .3em;
        width: 80%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .cheatsheetdialog div div br {
        margin-top: 1em;
    }

    .cheatsheetdialog div div code {
        font-size: 1.2em;
    }

    .cheatsheetdialog .box {
        background: #393D3F;

        color: white;

        width: min(40em, 100vw);
        height: min(30em, 100vh);
        overflow: scroll;

        display: flex;
        flex-direction: column;
        align-items: center;

        padding: 4px;
    }

    .cheatsheetdialog .box button {
        font-size: 1.5em;
        cursor: pointer;

        margin-top: 2em;

        background: #979B8D;
    }

    .cheatsheet {
        cursor: pointer;
        background: #979B8D;
        border: 0px solid black;
        border-radius: .25em;
    }

    .header {
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    .progress {
        margin-top: 1em;

        display: flex;
        flex-direction: row;

        justify-content: center;

        flex-grow: 1;
    }

    .levelprogress:first-child {
        border-top-left-radius: .25em;
        border-bottom-left-radius: .25em;
    }

    .levelprogress + .levelprogress {
        border-left: 1px solid black;
    }

    .levelprogress:last-child {
        border-top-right-radius: .25em;
        border-bottom-right-radius: .25em;
    }

    .levelprogress {
        color: white;

        background: #C80003;
        padding: .5em;

        cursor: pointer;
    }

    .done {
        background: #A6C64C;
    }

    .current {
        background: #546A7B;
    }


</style>