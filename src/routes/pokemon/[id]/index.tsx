import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export const usePokemonId = routeLoader$<number>(( {params, redirect} ) => {
    const id = Number(params.id);
    if ( isNaN(id) ) redirect(301, '/');
    if ( id < 1 || id > 898 ) redirect(301, '/');
    
    return (id);
});


export default component$(() => {

    const pokemonId = usePokemonId();
    // console.log(location); // {pathname: "/pokemon/1", params: {…}, search: "", hash: "", state: undefined,

    const pokemonGame = useContext(PokemonGameContext);
    
    return (
        <>
            <span class="text-5xl">
                Pokemon: {pokemonId}
            </span>
            <PokemonImage 
                pokemonId={ pokemonId.value}
                isVisible={pokemonGame.isPokemonVisible}
                backImage={pokemonGame.showBackImage}
            />
            
        </>
    );
});
