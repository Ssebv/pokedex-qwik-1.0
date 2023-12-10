import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";

interface PokemonImageProps {
    pokemonId: number;
    size?: number; // Opcional
    backImage?: boolean;
    isVisible?: boolean;
}

export const PokemonImage = component$(({
    pokemonId = 1,
    size = 200, 
    backImage = false,
    isVisible = true
} : PokemonImageProps ) => {

    const imageLoaded = useSignal(false);
    
    useTask$(({track}) => {
        track( () => pokemonId );

        imageLoaded.value = false;
    });

    const imageUrl = useComputed$(() => {
        return (backImage)
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${ pokemonId }.png`
            : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ pokemonId }.png`;
            

    
    });

    return (
        <div class="flex items-center justify-center" style={{width: `${size}px`, height:`${size}px`}}>
            { !imageLoaded.value && <span>Cargando...</span> }
            <img
            src={ imageUrl.value } 
            alt="Pokemon Sprite" 
            height={size}
            width={size}
            onLoad$={() => imageLoaded.value = true}
            class={[{
                "hidden": !imageLoaded.value,
                "brightness-0": !isVisible,  
            },"transition-all"]}
            />
        </div>
    );
});