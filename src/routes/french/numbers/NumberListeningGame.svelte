<script lang="ts">
  export var selectedVoiceUri: String = '';

  $: {
    onVoiceChanged();
  }

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
  var enteredNumber: string = '';
  var inputElement: HTMLInputElement | null = null;

  const RESULT_DELAY = 1000; // ms

  const onVoiceChanged = () => {
    if (state !== State.INIT) {
      playQuestion();
    }
  };

  const getRandomNumber = () => {
    // [minNumber, maxNumber]
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  };

  const getVoice = () => {
    return speechSynthesis.getVoices().filter((voice) => voice.voiceURI == selectedVoiceUri)[0];
  };

  const playQuestion = () => {
    const voice = getVoice();
    const utter = new SpeechSynthesisUtterance(answer.toString());
    utter.voice = voice;
    speechSynthesis.speak(utter);
  };

  const setQuestionState = () => {
    state = State.QUESTION;
    enteredNumber = '';
    playQuestion();
  };

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const makeNewQuestion = () => {
    answer = getRandomNumber();
    setQuestionState();
  };

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

  const focusInput = () => {
    if (inputElement == null) {
      return;
    }
    inputElement.focus();
  };

  const setResultSuccess = async () => {
    state = State.RESULT_SUCCESS;
    await delay(RESULT_DELAY);
    makeNewQuestion();
    focusInput();
  };

  const setResultFailed = async () => {
    state = State.RESULT_FAILED;
    await delay(RESULT_DELAY);
    setQuestionState();
    focusInput();
  };

  const onSubmit = () => {
    state = State.ANSWER;
    if (checkAnswer()) {
      setResultSuccess();
      return;
    }
    setResultFailed();
  };

  const onPlay = () => {
    makeNewQuestion();
  };

  const onMainButtonPressed = () => {
    if (state == State.INIT) {
      onPlay();
      return;
    }
    onSubmit();
  };
</script>

<svelte:head>
  <title>Les Nombres en français</title>
  <meta name="description" content="Étudions les chiffres français." />
</svelte:head>

<section>
  <div class="flex justify-center items-center flex-col">
    {#if state != State.INIT}
      <div class="w-full">
        <label
          class="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-first-name"
        >
          Votre réponse :
        </label>
        <!-- svelte-ignore a11y-autofocus -->
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="answer"
          placeholder="123"
          bind:value={enteredNumber}
          bind:this={inputElement}
          type="number"
          disabled={state == State.ANSWER}
          autofocus
        />
        {#if state == State.RESULT_FAILED}
          <p class="text-red-500 text-xs italic">Vous avez tort.</p>
        {:else if state == State.RESULT_SUCCESS}
          <p class="text-green-500 text-xs italic">Vous avez raison.</p>
        {:else}
          <p class="text-xs italic">&nbsp;</p>
        {/if}
      </div>
    {/if}
    {#if selectedVoiceUri !== ''}
      <button
        class="btn btn-blue mt-3 disabled:opacity-25"
        on:click={onMainButtonPressed}
        disabled={[State.ANSWER, State.RESULT_SUCCESS, State.RESULT_FAILED].includes(state)}
      >
        {#if state === State.INIT}
          Jouer
        {:else}
          Soumettre
        {/if}
      </button>
    {/if}
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
