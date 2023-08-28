<script lang="ts">
  export var selectedVoiceUri: String = '';

  enum State {
    INIT,
    QUESTION,
    ANSWER,
    RESULT_SUCCESS,
    RESULT_FAILED
}

  var minNumber = 0;
  var maxNumber = 100;
  var state: State = State.INIT;
  var answer = 0;
  var enteredNumber = null;

  const getRandomNumber = () => {
    return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
  };

  const getVoice = () => {
    return speechSynthesis.getVoices().filter((voice) => voice.voiceURI == selectedVoiceUri)[0];
  };

  const setQuestionState = () => {
    state = State.QUESTION;
    answer = getRandomNumber();
    const voice = getVoice();
    const utter = new SpeechSynthesisUtterance(answer.toString());
    utter.voice = voice;
    speechSynthesis.speak(utter);
  }

  const checkAnswer = () => {
    try {
      if (parseInt(enteredNumber) === answer) {
        return true;
      }
      return false;
    } catch (exception) {
      console.error(exception);
      return false;
    }
  };

  const onSubmit = () => {
    state = State.ANSWER;
    if (checkAnswer()) {
      return;
    }
  }

  const onPlay = () => {
    setQuestionState();
  }

  const onMainButtonPressed = () => {
    if (state == State.QUESTION) {
      onSubmit();
    } else if (state == State.INIT) {
      onPlay();
    }
  };
</script>

<svelte:head>
  <title>Les Nombres en français</title>
  <meta name="description" content="Étudions les chiffres français." />
</svelte:head>

<section>
  <div class="inline-block relative w-64">
    {#if state != State.INIT}
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="grid-first-name"
      >
        Votre réponse :
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="answer"
        placeholder="123"
        bind:value={enteredNumber}
        type="number"
        disabled='{state == State.ANSWER}'
      />
    {/if}
    <button class="btn btn-blue" on:click={onMainButtonPressed}> Play </button>
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

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
</style>