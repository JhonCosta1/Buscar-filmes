const nomeBusca = document.querySelector(".input");
const mensagemErro = document.querySelector("#mensagemErro");
const botaoBuscar = document.querySelector("#botao_buscar");
const titulo = document.querySelector("#titulo");
const ano = document.querySelector("#ano");
const duracao = document.querySelector("#duracao");
const genero = document.querySelector("#genero");
const diretor = document.querySelector("#diretor");
const atores = document.querySelector("#atores");
const poster = document.querySelector(".poster");
const sinopse = document.querySelector("#sinopse");
const apiKey = "b8aa1791";
const imgDefault = "./default_image.png";

async function buscaFilme(nomeBusca){
  const resposta = await fetch(`https://www.omdbapi.com/?t=${nomeBusca}&apikey=${apiKey}`); // http://www.omdbapi.com/?i=tt3896198&apikey=b8aa1791
  return resposta.json();
};

botaoBuscar.addEventListener("click", () => {
  limparCampos();
  core();
});

async function core(){
  try{
     const filme = await buscaFilme(nomeBusca.value);
     validaDados(filme);
     defineValores(filme);
  }catch(erro){
     mensagemErro.textContent = `${erro}`;
  }
};

function defineValores(filme){
  titulo.textContent = filme.Title ?? "";
  sinopse.textContent = filme.Plot ?? "";
  ano.textContent = `Year: ${filme.Year ?? ""}`;
  duracao.textContent = `Run time: ${filme.Runtime ?? ""}`;
  genero.textContent = `Genre: ${filme.Genre ?? ""}`;
  diretor.textContent = `Director: ${filme.Director ?? ""}`;
  atores.textContent = `Actors: ${filme.Actors ?? ""}`;
  poster.src = filme.Poster ?? imgDefault;
};

function limparCampos(){
  titulo.textContent = titulo?.textContent ?? "";
  sinopse.textContent = sinopse?.textContent ?? "";
  ano.textContent = ano?.textContent ?? "";
  duracao.textContent = duracao?.textContent ?? "";
  genero.textContent = genero?.textContent ?? "";
  diretor.textContent = diretor?.textContent ?? "";
  atores.textContent = atores?.textContent ?? "";
  poster.src = imgDefault;
};


function validaDados(filme){
     if(filme.Plot === undefined || filme.Year === undefined || filme.Actors === "N/A"){
          throw new Error("Filme não encontrado!!!");
     };
};