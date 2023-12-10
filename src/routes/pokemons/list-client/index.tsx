import { $ ,component$, useOnDocument, useStore, useTask$ } from '@builder.io/qwik'; // Frontend - Esto no es enteramente cierto
import type { DocumentHead } from '@builder.io/qwik-city'; // Backend - Esto no es enteramente cierto

import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallsPokemos } from '~/helpers/get-smalls-pokemos';
import type { SmallPokemon } from '~/interfaces';

interface PokemonPageState {
    currentPage: number;
    isLoading  : boolean;
    pokemons   : SmallPokemon[];
}

export default component$(() => {

    const pokemonState = useStore<PokemonPageState>({
        currentPage: 0,
        isLoading: false,
        pokemons: [],
    })
    
    // Solo lo ve el cliente -> Inportar useVisibleTask$
    // useVisibleTask$(async ({track}) => {
        
    //     track(()=> pokemonState.currentPage);
    //     const pokemons = await getSmallsPokemos(pokemonState.currentPage * 10);
    //     pokemonState.pokemons = [...pokemonState.pokemons,...pokemons];
    //     console.log('Hola mundo, useVisibleTask$');
    // });

    // Del lado del servidor y del cliente - Inportar useTask$
    useTask$(async ({track}) => {
        
        track(()=> pokemonState.currentPage);


        const pokemons = await getSmallsPokemos(pokemonState.currentPage * 10, 30);
        pokemonState.pokemons = [...pokemonState.pokemons,...pokemons];

        pokemonState.isLoading = false;
        // console.log('Hola mundo, useVisibleTask$');
    })

    useOnDocument(
        'scroll',
        $(() => {
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;

            if ((currentScroll + 200) >= maxScroll && !pokemonState.isLoading) {
                pokemonState.isLoading = true;
                pokemonState.currentPage++;
            }        // console.log(maxScroll, currentScroll);
    }))

    return(
        <>
          <div class="flex flex-col">
            <span class="my-5 text-5xl">Status</span>
            <span>Pagina actual: { pokemonState.currentPage }</span>
            <span>Esta cargando:</span>
    
          </div>
          <div class="mt-10">
            {/* <button onClick$={ () => pokemonState.currentPage--} 
            class="btn btn-primary mr-2">
              Anteriores
            </button> */}
            <button onClick$={ () => pokemonState.currentPage++}  
            class="btn btn-primary mr-2">
              Siguientes
            </button>
          </div>
    
          <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
            {
              pokemonState.pokemons.map(({name, id}) => (
                <div key={name} class="m-5 flex flex-col justify-center items-center">
                  <PokemonImage pokemonId={id} />
                  <span class="capitalize">{ name }</span>
                  
                </div>
              ))
            }
            
    
          </div>
    
          {/* <div>
            { JSON.stringify(pokemonResponse.value)}
          </div> */}
    
        </>
      );
});

export const head: DocumentHead = {
    title: 'List Client',

    

};