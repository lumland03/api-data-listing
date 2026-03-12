console.log('👍 JS Connected');

const STARTER_IDS = [
  3, 6, 9,       // Gen 1
  154, 157, 160, // Gen 2
  254, 257, 260, // Gen 3
  389, 392, 395, // Gen 4
  497, 500, 503, // Gen 5
  652, 655, 658, // Gen 6
  724, 727, 730, // Gen 7
  812, 815, 818, // Gen 8
  908, 911, 914  // Gen 9
];

function getRegion(id) {
  if (id <= 151) return 'Kanto';
  if (id <= 251) return 'Johto';
  if (id <= 386) return 'Hoenn';
  if (id <= 493) return 'Sinnoh';
  if (id <= 649) return 'Unova';
  if (id <= 721) return 'Kalos';
  if (id <= 809) return 'Alola';
  if (id <= 898) return 'Galar';
  return 'Paldea';
}

const typeColors = {
  fire: 'bg-orange-600',
  water: 'bg-blue-600',
  grass: 'bg-green-600',
  poison: 'bg-purple-600',
  flying: 'bg-indigo-400',
  fighting: 'bg-red-700',
  steel: 'bg-gray-500',
  dark: 'bg-zinc-800',
  fairy: 'bg-pink-400',
  ghost: 'bg-violet-800',
  psychic: 'bg-rose-500',
  ground: 'bg-amber-700'
};

async function displayStarters() {
  const dataContainer = document.querySelector(".dataContainer");

  try {
    const promises = STARTER_IDS.map(id => 
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
    );
    const data = await Promise.all(promises);

    dataContainer.innerHTML = "";

    data.forEach(pokemon => {
      // 1. DEFINE REGION HERE
      const region = getRegion(pokemon.id);

      // 2. CREATE TEMPLATE
      const template = `
        <div class="group relative bg-zinc-300 border border-slate-300 rounded-xl p-4 flex flex-col items-center overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-500/20 hover:-translate-y-1">
          
          <img 
            src="${pokemon.sprites.other['official-artwork'].front_default}" 
            alt="${pokemon.name}" 
            class="w-64 h-64 z-0 group-hover:scale-110 transition-transform duration-500"
          >

          <h2 class="text-2xl text-black font-bold uppercase mt-2 group-hover:opacity-20 transition-opacity">${pokemon.name}</h2>

          <div class="absolute inset-0 bg-zinc-700/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
            <p class="text-gray-50 font-mono text-xl mb-1">${region} Region</p>
            <div class="flex gap-2">
              ${pokemon.types.map(t => `
                <span class="px-12 py-3 rounded ${typeColors[t.type.name] || 'bg-slate-700'} text-white text-lg font-bold uppercase">
                  ${t.type.name}
                </span>
              `).join('')}
            </div>
            <p class="text-gray-50 text-xl mt-4">PokeDex Number: #${pokemon.id}</p>
          </div>

        </div>
      `;

      dataContainer.insertAdjacentHTML("beforeend", template);
    });

  } catch (error) {
    console.error("Fetch error:", error);
  }
}

displayStarters();