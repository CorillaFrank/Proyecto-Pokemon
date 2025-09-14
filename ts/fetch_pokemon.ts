import { listPokemon, pokemon } from "./interface/interface";
export default function fetchPokemon(): void {
  //url
  const urlPokemon: string = "https://pokeapi.co/api/v2/pokemon/";
  // es un elemento html element
  const $pokeBox = document.getElementById("poke-box") as HTMLElement;
  const fragment: Node = document.createDocumentFragment();

  //forzamos que sea de tipo html element
  // realizamos la peticion fetch
  fetch(urlPokemon)
    .then((response) => response.json()) // esto nos va devolver una promesa que vamos a controlar con then
    //el response igual a un response .json para converitr
    // lo que nos este devolviendo esta peticiendo fetch a json
    .then((res: listPokemon) => {
      res.results.forEach((pokemon) => {
        const $figure: HTMLElement = document.createElement("figure");
        const $img: HTMLImageElement = document.createElement("img");
        const $figcaption: HTMLElement = document.createElement("figcaption");
        const $namePokemon: Node = document.createTextNode(pokemon.name);

        $img.setAttribute("alt", pokemon.name);
        $img.setAttribute("tittle", pokemon.name);
        //2da peticion fetch para obtener la imagen del pokemon
        fetch(pokemon.url)
          .then((response) => response.json())
          .then((res: pokemon) => {
            $img.setAttribute("src", res.sprites.front_default);
          });

        $figcaption.appendChild($namePokemon);
        $figure.appendChild($img);
        $figure.appendChild($figcaption);
        fragment.appendChild($figure); //fragment es un pegar constantemente estos elememntos html
        //directamente al a raiz del DOM del navegador ocupa muchos recursos

        //en vez de pegar estos nodos al DOM los vamos pegando a un fragmento
        // y una vez que ya tenemos todos los nodos creados
      });
      console.log(res);
      $pokeBox.appendChild(fragment);
    });
}
