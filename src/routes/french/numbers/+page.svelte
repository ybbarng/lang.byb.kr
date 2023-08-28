<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import NumberListeningGame from './NumberListeningGame.svelte';

  var voices: any[] = [];
  var selectedVoiceUri: String = '';

  const registerVoicesListener = () => {
    voices = getVoices();
    if (voices.length > 0) {
      return;
    }
    speechSynthesis.onvoiceschanged = () => {
      voices = getVoices();
    };
  };

  const getVoices = () => {
    return speechSynthesis
      .getVoices()
      .filter((voice) => voice.lang.includes('fr'))
      .map((voice) => ({
        value: voice.voiceURI,
        label: `${voice.name} (${voice.lang})`
      }));
  };

  onMount(() => {
    if (browser) {
      registerVoicesListener();
    }
  });
</script>

<svelte:head>
  <title>Les Nombres en français</title>
  <meta name="description" content="Étudions les chiffres français." />
</svelte:head>

<section>
  <div class="flex justify-center items-center">
    <div class="max-w-2xl w-full p-5">
      <h1 class="text-xl font-bold">Les Nombres en français</h1>
      <p class="text-gray-700 mt-1.5">🎧 Écoutez et devinez le numéro.</p>
      <div class="flex justify-center items-center mt-5">
        <div class="w-full">
          <label
            for="voice"
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            La Voix
          </label>
          <div class="inline-block relative w-full">
            <select
              id="voice"
              class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              bind:value={selectedVoiceUri}
            >
              <option value="" disabled selected>Sélectionnez la voix TTS</option>
              {#each voices as voice}
                <option value={voice.value}>
                  {voice.label}
                </option>
              {/each}
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                ><path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                /></svg
              >
            </div>
          </div>
        </div>
      </div>
      <NumberListeningGame {selectedVoiceUri} />
    </div>
  </div>
</section>

<style>
</style>
