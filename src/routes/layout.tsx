import { component$, Slot, useContextProvider, useStore, useStyles$ } from '@builder.io/qwik';
// import { routeLoader$ } from '@builder.io/qwik-city';
// import type { RequestHandler } from '@builder.io/qwik-city';

import styles from './styles.css?inline';
import Navbar from '~/components/shared/navbar/navbar';
import { PokemonGameContext, type PokemonGameState } from '~/context';

export default component$(() => {
  useStyles$(styles);

  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 4,
    isPokemonVisible: true,
    showBackImage: false,
  });

  useContextProvider(PokemonGameContext, pokemonGame);
  
  return (
    <>
      <Navbar />
      <main class= "flex flex-col items-center justify-center flex-1 px-20 text-center"> 
        <Slot />
      </main>
    </>
  );
});
