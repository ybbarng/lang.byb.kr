<script lang="ts">
    export var selectedVoiceUri: String = '';

    var minNumber = 0;
    var maxNumber = 100;
    var answer = 0;

    const getRandomNumber = () => {
        return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
    };

    const getVoice = () => {
        return speechSynthesis.getVoices()
            .filter((voice) => voice.voiceURI == selectedVoiceUri)[0];
    }

    const play = () => {
        answer = getRandomNumber();
        const voice = getVoice();
        const utter = new SpeechSynthesisUtterance(answer.toString());
        utter.voice = voice
        speechSynthesis.speak(utter);

    };
</script>

<svelte:head>
    <title>Les Nombres en français</title>
    <meta name="description" content="Étudions les chiffres français." />
</svelte:head>

<section>
    <div class="inline-block relative w-64">
        <button class="btn btn-blue" on:click={play}> Button </button>
    </div>
</section>

<style>
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn-blue {
    @apply bg-blue-500 text-white;
  }
  .btn-blue:hover {
    @apply bg-blue-700;
  }
</style>
