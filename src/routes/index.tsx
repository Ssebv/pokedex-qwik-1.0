import { $, component$, useContext } from '@builder.io/qwik';
import { type DocumentHead, useNavigate} from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export default component$(() => {

  const nav = useNavigate();

  const pokemonGame = useContext(PokemonGameContext);



  // const pokemonId = useSignal(1); // Primitivos bool strings numbers
  // const showBackImage = useSignal(false); // Primitivos bool strings numbers
  // const isPokemonVisible = useSignal(false); // Primitivos bool strings numbers

  const changePokemonId = $((value: number) => {
    if (pokemonGame.pokemonId + value > 0 && pokemonGame.pokemonId+ value < 899) 
    pokemonGame.pokemonId += value;
  });

  // const goToPokemon = $(() => {
  //   nav(`/pokemon/${pokemonId.value}`);
  // });

  const goToPokemon = $(( id: number) => {
    nav(`/pokemon/${id}`);
  });

    
  return (
    <> 
      <span class = "text-2xl"> Buscador Simple </span>
      <span class = "text-9xl"> {pokemonGame.pokemonId} </span>

        <div onClick$={()=>goToPokemon( pokemonGame.pokemonId)}>
        <PokemonImage 
          pokemonId={pokemonGame.pokemonId} 
          backImage={pokemonGame.showBackImage} 
          isVisible={pokemonGame.isPokemonVisible}
        />
        </div>


      <div class = "mt-2">
        <button onClick$={ () => changePokemonId(-1)} class= "btn btn-primary mr-2">Anterior</button>
        <button onClick$={ () => changePokemonId(+1)} class= "btn btn-primary mr-2">Siguientes</button>
        <button onClick$={ () => pokemonGame.showBackImage =!pokemonGame.showBackImage} class= "btn btn-primary mr-2">Voltear</button>
        <button onClick$={ () => pokemonGame.isPokemonVisible =! pokemonGame.isPokemonVisible} class= "btn btn-primary mr-2">Revelar</button> 
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'Esta es mi aplicacion de Qwik',
    },
  ],
};
