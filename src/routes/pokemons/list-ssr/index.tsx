import { component$, useComputed$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallsPokemos } from '~/helpers/get-smalls-pokemos';
import type { SmallPokemon} from '~/interfaces';

export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({query, redirect, pathname}) => {
  
  const offset = Number(query.get('offset') || '0');
  if (offset < 0) redirect(301, pathname);
  console.log(offset);
  const pokemons =  await getSmallsPokemos(offset); 
  return pokemons; // Return the array directly

});


export default component$(() => {

  const pokemons = usePokemonList();
  const location = useLocation();

  // console.log(location.url.searchParams.get('offset'));
  
  const currentOffset = useComputed$<number>(()=> {
    const offsetStr = new URLSearchParams(location.url.search);
    return Number(offsetStr.get('offset') || 0);
  });



  return(
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: {currentOffset}</span>
        <span>Esta cargando pagina: {location.isNavigating ? 'Si': 'No'}</span>

      </div>
      <div class="mt-10">
        <Link href={`/pokemons/list-ssr?offset=${currentOffset.value - 10}`}
          class="btn btn-primary mr-2">
          Anteriores
        </Link>
        <Link href={`/pokemons/list-ssr?offset=${currentOffset.value + 10}`}
          class="btn btn-primary mr-2">
          Siguientes
        </Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {
          pokemons.value.map(({name, id}) => (
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
  title: 'SSR-List',
};