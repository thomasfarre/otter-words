<template>
  <div v-if="timeLeft > 0">
    <div class="max-w-[1100px] mx-auto">
      <div
        class="space-y-4 md:space-y-0 md:grid-cols-9 md:grid-rows-3 md:gap-4 md:grid"
      >
        <div
          class="flex-col items-center justify-center hidden col-span-6 p-8 space-y-4 text-center bg-white md:flex rounded-card"
        >
          <div class="title text-brown">
            <span> Round 1 : Le petit bac </span>
          </div>
          <div class="text-brown">
            <span>
              Une lettre et une catégorie s’affichent, à vous de trouver le plus
              de mot possible (exemples : les animaux en L, les pays en T…).
              Toutes les 30 secondes, la lettre et la catégorie changent.
            </span>

          </div>
        </div>
        <div
          class="relative flex-col justify-center hidden col-span-3 px-16 py-8 space-y-4 md:flex bg-green rounded-card"
        >
          <div>
            <span class="text-white subtitle"> Le score de ton équipe </span>
          </div>
          <div class="flex flex-col">
            <span class="text-white title"> {{ tweened.totalScore.toFixed(0) }} points </span>
            <span class="font-bold text-white"> C'est super </span>
          </div>
          <div class="absolute bottom-0 right-0">
            <img :src="scoreImage" alt="" />
          </div>
        </div>

        <div
          class="h-full col-span-4 row-span-2 pt-4 text-center bg-white rounded-card"
        >
          <div class="px-16">
            <div class="flex items-center justify-center space-x-4">
              <div>
                <svg
                  class="w-10 h-10"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 36 36"
                >
                  <rect width="36" height="36" fill="#481A1A" rx="18" />
                  <path
                    fill="#fff"
                    d="M13.327 27.036c0-.875.267-1.59.8-2.144.555-.576 1.312-.864 2.272-.864.96 0 1.707.288 2.24.864.555.555.832 1.27.832 2.144 0 .875-.277 1.6-.832 2.176-.533.555-1.28.832-2.24.832-.96 0-1.717-.277-2.272-.832-.533-.576-.8-1.301-.8-2.176Zm1.056-4.192c-.362-.192-.704-.533-1.024-1.024-.32-.512-.48-1.11-.48-1.792 0-.661.17-1.152.512-1.472.363-.341.886-.597 1.568-.768l2.496-.608c1.067-.277 1.6-.79 1.6-1.536 0-.405-.202-.757-.608-1.056-.384-.299-1.056-.448-2.016-.448-.874 0-1.696.117-2.464.352-.768.213-1.386.47-1.856.768a4.107 4.107 0 0 1-.928-.992c-.256-.405-.384-.885-.384-1.44 0-.555.16-1.035.48-1.44.32-.427.758-.768 1.312-1.024.576-.277 1.248-.48 2.016-.608.79-.128 1.654-.192 2.592-.192 2.518 0 4.416.565 5.696 1.696 1.302 1.11 1.952 2.57 1.952 4.384 0 3.413-2.41 5.6-7.232 6.56l-3.232.64Z"
                  />
                </svg>
              </div>
              <span class="subtitle text-brown"> Les mots à trouver </span>
            </div>
            <div class="pt-4 md:pt-16">
              <div class="flex justify-center space-x-1 text-lg font-bold text-brown">
                <span>
                  Un
                </span>
                <transition
                  enter-active-class="transition duration-300 ease-out"
                  enter-from-class="transform scale-50"
                  enter-to-class="transform scale-100"
                  leave-active-class="transition duration-300 ease-out"
                  leave-from-class="transform scale-100"
                  leave-to-class="transform scale-50"
                  mode="out-in"
                >
                  <div
                    v-if="selectedCategory"
                    :key="selectedCategory"
                    class="text-green"
                    >{{ formatCategories(selectedCategory) }}
                  </div>
                </transition>
                <span>
                  commençant par :
                </span>
              </div>
            </div>
            <transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="transform rotate-180"
              enter-to-class="transform rotate-0"
              leave-active-class="transition duration-300 ease-out"
              leave-from-class="transform rotate-0"
              leave-to-class="transform rotate-180"
              mode="out-in"
            >
              <div
                v-if="startLetter"
                :key="startLetter"
                class="px-4 py-2 mx-auto mt-2 rounded-xl bg-green w-fit"
              >
                <span class="text-white title">
                  {{ startLetter }}
                </span>
              </div>
            </transition>
            <div class="pt-4">
              <input
                v-model="userMessage"
                @keyup.enter="handleUserMessage"
                type="text"
                placeholder="Votre réponse ici"
                class="w-full p-2 text-lg text-gray-700 border border-green focus:ring-2 ring-green focus-visible:outline-none placeholder:text-gray-400 placeholder:italic placeholder:text-xl"
              />
            </div>
          </div>
          <div class="py-16 mt-12 bg-gray-200 rounded-b-card">
            <div class="flex items-center justify-center space-x-4">
              <button
                @click="selectRandomCategoryAndLetter"
                class="flex items-center justify-center space-x-4 transition duration-300 ease-out rounded-full group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-8 h-8 transition duration-300 ease-out text-green group-hover:text-green-hover"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span
                  class="underline transition duration-300 ease-out text-brown group-hover:text-brown-hover"
                >
                  au secours, c'est trop dur, je passe</span
                >
              </button>
            </div>
          </div>
        </div>
        <div
          class="col-span-5 row-span-1 px-8 py-4 text-center bg-white rounded-card"
        >
          <div class="flex items-center justify-center mx-auto max-w-72">
            <div>
              <svg
                class="w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 37 36"
              >
                <rect width="36" height="36" x=".5" fill="#481A1A" rx="18" />
                <path
                  fill="#fff"
                  d="M19.5 19h2a1 1 0 0 1 0 2h-3a.997.997 0 0 1-1-1v-4a1 1 0 0 1 2 0v3Zm-7.13-4.139a1.5 1.5 0 1 1 2.077-1.76 7.98 7.98 0 0 1 1.126-.548A2.5 2.5 0 0 1 17 8h3a2.5 2.5 0 0 1 1.428 4.553c.39.154.767.337 1.127.548a1.5 1.5 0 1 1 2.076 1.76 8 8 0 1 1-12.261 0Zm6.13 11.14a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM17 10a.5.5 0 1 0 0 1h3a.5.5 0 1 0 0-1h-3Z"
                />
              </svg>
            </div>
            <span class="!leading-6 subtitle text-brown">
              Trouve un maximum de mots dans les temps
            </span>
          </div>
          <div class="relative mt-8">
            <ProgressBar
              :progressBarWidth="progressBarWidth"
              :otterImage="otterImage"
              :cartoonTroutImage="cartoonTroutImage"
            />
          </div>
          <div class="pt-12">
            <span class="subtitle text-green">
              {{ timeLeft }}
            </span>
            <span class="text-lg font-bold text-brown">
              secondes restantes, dépêche-toi !
            </span>
          </div>
        </div>

        <div
          class="col-span-5 row-span-1 text-center bg-white rounded-card bg-[url('/public/images/toto.png')] bg-bottom bg-cover h-full"
        >
          <div
            class="flex items-center justify-center py-4 space-x-4 bg-white rounded-t-card"
          >
            <div>
              <svg
                class="w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 36 36"
              >
                <g clip-path="url(#a)">
                  <path
                    fill="#481A1A"
                    d="M36 18c0-9.941-8.059-18-18-18S0 8.059 0 18s8.059 18 18 18 18-8.059 18-18Z"
                  />
                  <path
                    fill="#fff"
                    stroke="#fff"
                    stroke-width=".457"
                    d="M30.857 14.406a6.186 6.186 0 0 0-6.179-6.18 6.189 6.189 0 0 0-6.088 5.12H5.534a.391.391 0 0 0-.39.392v1.336c0 .216.174.39.39.39H18.59c.053.303.127.597.221.882.008.029.707 2.84 1.733 5.612 1.448 3.913 2.8 5.815 4.13 5.815h.006c1.273-.006 2.584-1.847 4.008-5.63a59.463 59.463 0 0 0 1.707-5.393 6.146 6.146 0 0 0 .462-2.344Zm-6.179-5.397a5.403 5.403 0 0 1 5.397 5.397 5.403 5.403 0 0 1-5.397 5.396 5.402 5.402 0 0 1-5.396-5.396 5.402 5.402 0 0 1 5.396-5.397ZM5.926 14.13h3.631v.553H5.926v-.553Zm4.414.553v-.553h8.166a6.336 6.336 0 0 0 0 .553H10.34Zm17.614 7.19c-1.738 4.614-2.871 5.117-3.278 5.119h-.002c-.433 0-1.624-.52-3.394-5.3a52.543 52.543 0 0 1-.979-2.928 6.16 6.16 0 0 0 6.861 1.3l-1.957 4.835a.391.391 0 1 0 .726.294l2.328-5.753c.257-.184.5-.387.726-.607-.277.901-.63 1.974-1.031 3.04Zm-3.276-2.557a4.914 4.914 0 0 0 4.91-4.91 4.915 4.915 0 0 0-4.91-4.908 4.915 4.915 0 0 0-4.909 4.909 4.914 4.914 0 0 0 4.91 4.909Zm0-9.036c.826 0 1.595.245 2.241.665l-2.243 6.063a.391.391 0 1 0 .734.272l2.153-5.82a4.113 4.113 0 0 1 1.242 2.947 4.131 4.131 0 0 1-4.127 4.126 4.131 4.131 0 0 1-4.126-4.126 4.131 4.131 0 0 1 4.126-4.127Z"
                  />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M0 0h36v36H0z" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <span class="subtitle text-brown"> Les mots trouvés </span>
          </div>
          <FoundWords :correct-guess="reversedCorrectGuess" />
        </div>

        <div
          class="relative col-span-9 row-span-1 overflow-hidden text-center bg-white rounded-card"
        >
          <div class="px-8 pt-4">
            <span class="subtitle text-brown">
              La rivière des espoirs déchus
            </span>
          </div>
          <div
            class="relative overflow-x-auto h-40 bg-[url('/public/images/river.svg')] bg-bottom bg-cover"
          >
            <div>
              <div class="flex pt-20 pl-4 space-x-4 whitespace-nowrap">
                <span
                  class="text-lg font-bold text-white"
                  v-for="message in reversedIncorrectGuess"
                  :key="message.id"
                >
                  {{ message.text }}
                </span>
              </div>
            </div>
            <!-- <div class="absolute left-0 bottom-4 animate-fishmove">
              <svg class="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 70 41"><path fill="#000" d="M8.444 28.133c1.502-.67 3.046-1.182 4.622-1.646.285-.084 2.713-.85 3.554-.756 1.722-3.011 3.613-5.77 6.162-8.158a33.143 33.143 0 0 1 4.558-3.557c-.835.104-2.613.254-2.324-.406.843-1.93 3.886-3.107 5.646-3.905 2.31-1.048 4.636-1.854 7.131-2.319 1.037-.191 2.007-.167 3.039.038.985.195 1.939.836 2.917 1.083 3.451-.175 6.97.224 10.365 1.075 1.078-.153 2.215.088 3.363.437 2.12.643 4.27 1.546 6.144 2.739 1.387.885 3.125 2.274 3.835 3.907.178.2.347.426.343.623-.018.747-.978.808-1.661.879-.612.21-1.282.262-1.914.39-.796.161-1.566.443-2.342.688.436-.028.873-.06 1.309-.106.95-.098 2.182-.161 3.096.203.771.307.74.729.107 1.204-1.377 1.03-3.308 1.597-4.894 2.184-.846.315-1.627.757-2.484 1.049-.902.307-1.86.415-2.8.513a11.92 11.92 0 0 1-2.4.018c-.274.748-3.063 1.506-3.402 1.604-1.617.462-3.3.563-4.973.617-3.573.114-7.108-.148-10.671-.442a36.556 36.556 0 0 0-.984-.066c-1.328.152-2.54.663-3.713 1.314-.788.436-1.433.736-2.342.698-.713-.031-1.832-.948-1.472-1.575-1.08.193-2.143.44-3.18.758-.58.176-1.143.385-1.697.62-1.937 1.937-1.685 5.711-2.378 8.182-.169.6-.577 1.774-1.373 1.781-.855.008-1.533-.461-2.257-.881-.895-.518-1.894-1.122-2.575-1.914-.408-.479.626-1.735.864-2.047.524-.684 1.246-1.285 1.613-2.08-.422.917-1.829 1.634-2.62 2.193-1.73 1.229-3.438.639-5.003-.66-.125-.105-.455-.508-.604-.502-.451.017-.897.094-1.353.083-.423-.012-1.122-.104-1.356-.535-.659-1.218 3.46-3.038 4.106-3.326h-.002Z"/><path fill="#B29155" d="M40.438 7.617c-2.04-.31-4.457.502-6.371 1.17-2.01.7-3.99 1.643-5.824 2.72-.853.5-1.632 1.093-2.34 1.787-.585.574.451.466.582.46a6.48 6.48 0 0 1 1.184.049c4.305-2.74 9.284-4.59 14.22-5.15.488-.056.975-.095 1.466-.127-.975-.246-1.943-.765-2.914-.91l-.003.001Z"/><path fill="#E9B7A6" d="M29.38 27.326c.245-.139.495-.273.747-.404.377-.2.771-.36 1.168-.516a6.941 6.941 0 0 1 1.612-.414 33.085 33.085 0 0 0-5.937.353c-.006.007-.008.012-.017.017.697 1.313 1.506 1.634 2.428.967v-.003Z"/><path fill="#8EA5A7" d="M21.35 27.26c3.315-1.348 6.972-1.67 10.515-1.697 6.983-.055 15.045 2.337 21.47-1.307a8.959 8.959 0 0 1-1.304-.285c-2.046-.625-4.764-3.256-3.69-5.659.032-.074.206-.034.187.05-.531 2.466 1.85 4.641 3.96 5.285 2.145.656 4.958.197 6.977-.61 2.147-.857 4.402-1.684 6.398-2.859.741-.436-.79-.61-.917-.619-.51-.03-1.027-.025-1.535-.006a9.715 9.715 0 0 1-.756-.006c-.619.069-1.237.14-1.842.125-.72-.016-1.753-.006-2.348-.533.018.097.03.19-.008.252-.086.141-.296.035-.382-.046-.217-.198-.353-.64-.086-.85.33-.255.918.01 1.254.124.042.012.088.047.066.082-.057.086-.142.09-.24.093-.139.003-.278-.004-.416.002 1.078.667 2.368.31 3.533-.04.738-.238 1.475-.503 2.233-.602.689-.09 1.357-.246 2.038-.37.727-.133.764-.477.577-.858-.112-.61-.758-1.299-1.066-1.686a7.264 7.264 0 0 0-.707-.762c.026.02.051.036.076.053-2.1-1.937-5.062-3.178-7.548-4.016a14.88 14.88 0 0 0-1.285-.377c-.85-.32-1.735-.51-2.547-.106-.017-.006-.036-.01-.056-.014-.922.289-1.723 1.052-2.4 1.675-1.186 1.096-2.073 2.379-3.08 3.604.215-.418.461-.824.624-1.165.053-.119.11-.236.166-.355.797-1.154 1.623-2.25 2.77-3.23a4.204 4.204 0 0 1 1.153-.705c-4.661-1.044-9.517-1.19-14.187-.169-6.317 1.382-12.618 5.095-17.05 9.795-2.086 2.215-3.685 4.796-5.269 7.386-.044.074-.09.15-.131.223a6.149 6.149 0 0 0-.043.625c-.04 1.301 1.137 1.206 2.05.938.906-.541 1.872-.99 2.846-1.385v.006Z"/><path fill="#8EA5A7" d="M58.85 11.273c-1.866-.6-3.696-1.123-5.584-.338-1.093.455-2.049 1.191-2.94 1.997.365-.427.749-.843 1.173-1.234.674-.624 1.478-1.386 2.401-1.675l.056.014c.811-.403 1.697-.212 2.546.106.432.104.858.233 1.285.377 2.49.838 5.45 2.08 7.549 4.017-.026-.02-.051-.036-.076-.053.249.233.487.486.706.761.31.39.955 1.077 1.066 1.687a.78.78 0 0 1 .09.328c-1.782-2.93-5.112-4.972-8.273-5.99v.003ZM49.84 12.903a2.32 2.32 0 0 1 .124-.242c.438-.734 1.01-1.37 1.45-2.102.043-.072.001-.168-.08-.19a18.325 18.325 0 0 0-2.227-.49c-6.795-1.021-13.925 1.04-19.73 4.542a37.37 37.37 0 0 0-8.013 6.465 37.534 37.534 0 0 0-3.219 3.924c-.553.78-1.144 1.599-1.664 2.452.005-.06.009-.12.017-.178.045-.074.087-.148.132-.223 1.584-2.587 3.18-5.17 5.268-7.385 4.433-4.701 10.734-8.414 17.05-9.796 4.67-1.021 9.526-.875 14.188.17a4.24 4.24 0 0 0-1.153.705c-.852.727-1.526 1.52-2.143 2.35v-.002Z" style="mix-blend-mode:screen"/><path fill="#E8EDE9" d="M20.89 25.42c2.224-1.882 4.96-3.383 7.597-4.59 5.165-2.364 11.12-3.63 16.77-2.488.077.013.172-.036.164-.125-.05-.62-.084-1.252.055-1.856.335.641.651 1.29 1.04 1.902.064.1.2.074.238-.033.518-1.402 1.347-2.476 2.336-3.465-.456 1.606-.06 3.354 1.702 4.107 3.268 1.397 6.253-1.299 9.51-.847-.213.127-.43.248-.627.4-.103.08-.068.23.066.244 2.59.277 4.895-1.735 7.38-1.367-.013.22-.19.401-.667.487-.682.125-1.35.281-2.038.371-.759.1-1.496.365-2.233.601-1.165.352-2.456.708-3.534.04.139-.005.278.002.417-.001.098-.003.182-.007.24-.093.021-.035-.024-.07-.067-.082-.336-.116-.923-.381-1.254-.126-.268.208-.131.652.085.85.09.08.296.184.383.046.039-.06.023-.155.008-.253.594.528 1.628.517 2.347.534.606.015 1.224-.057 1.843-.126.262.011.52.015.755.007.51-.02 1.028-.025 1.536.006.126.008 1.658.183.917.619-1.999 1.176-4.252 1.999-6.398 2.859-2.02.807-4.832 1.265-6.977.61-2.11-.644-4.492-2.822-3.96-5.286.018-.083-.156-.125-.188-.05-1.07 2.404 1.645 5.037 3.69 5.66.43.13.863.22 1.305.285-6.426 3.644-14.487 1.251-21.47 1.307-3.545.028-7.203.35-10.516 1.697-.974.397-1.94.844-2.847 1.385-.49.144-1.056.236-1.468.09 1.438-.858 2.617-2.27 3.855-3.318l.005-.002Z"/><path fill="#E9B7A6" d="M46.014 25.776c.602-.122 1.281-.254 1.8-.607.23-.159.66-.402.76-.674.075-.198-.185-.28-.282-.4-.375-.461-.78-1.15-.923-1.77.488.37.946.756 1.555.919.125.032.22-.127.125-.219-1.133-1.107-1.767-4.069-.318-5.162.359 3.1 3.457 4.308 6.236 4.488 1.846.12 3.695-.136 5.48-.588 1.216-.31 2.452-.657 3.617-1.134.617-.251 1.312-.618 1.999-.692.013.07-.037.15-.196.245-1.999 1.176-4.253 2-6.398 2.859-2.02.808-4.832 1.266-6.977.61-2.11-.643-4.492-2.821-3.96-5.285.018-.084-.156-.126-.188-.05-1.071 2.403 1.645 5.037 3.69 5.66.43.13.863.22 1.305.284-3.25 1.843-6.917 2.141-10.65 1.995a27.937 27.937 0 0 0 3.326-.474l-.001-.005Z"/><path fill="#B29155" d="M6.486 31.57c1.372-.12 1.993.988 3.19 1.616 2.273 1.193 3.694-2.121 5.637-2.545.094-.02.198.004.252.09.238.374-.696 1.22-.924 1.472-.628.693-2.281 2.267-1.053 3.186.849.635 1.87 1.168 2.81 1.646 2.203 1.117 2.579-3.87 2.793-5.132.216-1.272.548-2.654 1.328-3.707l-.026.007a24.86 24.86 0 0 0-1.78.672c-.326.135-.71.285-1.091.343.009-.005.015-.012.024-.017a2.145 2.145 0 0 1-.892-.205c-.624-.528-.923-1.16-.736-2.013l.064-.3c.077-.137.154-.278.233-.417.028-.049.057-.098.082-.147-2.16.37-4.217.997-6.287 1.781a20.445 20.445 0 0 0-3.73 1.89 7.123 7.123 0 0 0-1.313 1.076c-.847.88 1.42.7 1.418.701l.001.003Z"/><path fill="#B29155" d="M16.579 30.461a22.935 22.935 0 0 0-3.402 3.866c.165-.794 1.046-1.654 1.466-2.12.227-.251 1.162-1.097.924-1.472-.054-.085-.161-.108-.252-.09-.813.177-1.532.858-2.264 1.503.77-.76 1.63-1.421 2.29-2.293.062-.08.034-.231-.09-.224-.798.05-1.655.488-2.343 1.043.265-.402.557-.781.946-1.09.389-.31.76-.608.953-1.077.03-.077-.046-.17-.125-.165-1.72.095-3.268 1.254-4.538 2.47a9.122 9.122 0 0 1 1.342-1.45c.575-.493 1.214-.944 1.628-1.593.055-.085-.018-.193-.113-.197-.976-.038-1.886.279-2.8.578-.696.229-1.408.404-2.096.653a19.03 19.03 0 0 1 2.006-.898c2.07-.784 4.126-1.408 6.288-1.781-.028.05-.057.099-.082.147l-.233.418-.065.3c-.186.854.114 1.486.736 2.012.282.133.585.2.892.205-.009.005-.015.012-.024.017.382-.055.766-.206 1.092-.343a25.174 25.174 0 0 1 1.779-.672l.026-.007c-.777 1.052-1.11 2.431-1.328 3.707-.056.339-.127.948-.24 1.637.088-.998.126-2.006-.214-2.957-.04-.107-.176-.133-.237-.033-.382.614-.498 1.324-.683 2.016-.082.304-.185.604-.295.902.192-.978.279-1.979-.002-2.92-.03-.101-.143-.118-.218-.059-.242.198-.402.471-.532.77.03-.233.048-.468.03-.706-.007-.115-.133-.173-.22-.092l-.002-.005Z" style="mix-blend-mode:multiply"/><path fill="#000" d="M39.249 19.463c2.275-.288 4.558.437 6.737.94.033.007.056.056.01.057-.025.002-.052-.001-.078-.002.066.027.13.054.197.088.069.034.166.136.066.2-2.353 1.494-7.372 3.873-9.5.844-1.143-1.626 1.696-2.016 2.569-2.125l-.001-.002Z"/><path fill="#B29155" d="M43.535 21.66c.511-.238 1.065-.426 1.555-.706.744-.424.925-.248.192-.519-.94-.106-1.927-.406-2.86-.48-.86-.07-5.406-.46-4.532 1.515.855 1.931 4.303.82 5.643.191h.002Z"/><path fill="#000" d="M61.369 18.17c1.384-.77 3.113-1.425 4.725-1.23.027.003.075.056.026.058-1.602.035-3.067.96-4.597 1.334-.08.021-.277-.096-.154-.162ZM57.907 15.258c.139.519.566.856.95.753.385-.103.586-.609.447-1.128-.14-.519-.567-.856-.95-.753-.385.103-.587.609-.447 1.128Z"/><path fill="#fff" d="M58.512 14.704c.043.158.171.26.29.228.118-.032.178-.186.136-.342-.042-.156-.171-.263-.29-.23-.118.03-.179.183-.136.344Z"/><path fill="#5B5E5F" d="M53.271 12.598a.523.523 0 0 1 .365.074c.161-.035.352.078.462.177.321.29.2.95-.148 1.152-.402.238-.86-.174-.989-.54-.108-.305-.057-.783.308-.863h.002ZM52.273 15.033a.3.3 0 0 1 .206-.026c.024-.036.052-.067.102-.062.09.007.166.068.182.158a.544.544 0 0 1-.048.274c-.042.113-.116.156-.237.129-.163-.038-.448-.348-.205-.473ZM50.085 14.679a.559.559 0 0 1 .517-.374l.024-.006a.456.456 0 0 1 .396.066c.253.18.423.516.434.827.011.294-.112.568-.417.62-.284.05-.587-.14-.773-.34-.198-.217-.29-.513-.18-.79l-.001-.003ZM54.093 16.875c-.001-.122.137-.175.236-.175.051-.001.111.009.17.027.06-.037.119-.06.203-.015.123.069.188.166.202.306.04.355-.39.277-.582.177-.124-.063-.23-.173-.231-.32h.002ZM41.354 12.651c.073-.124.14-.213.27-.276.141-.067.319-.033.465.021a.216.216 0 0 1 .077-.002c.307.033.539.355.622.628.07.23.024.516-.185.653-.333.217-.79.076-1.06-.184-.22-.213-.357-.56-.192-.842l.003.002ZM39.252 14.69c.021 0 .041-.003.06-.003.137-.008.462.2.245.318l-.045.025c-.1.056-.256-.028-.322-.099-.08-.085-.082-.229.06-.238l.002-.003ZM29.59 15.461a.476.476 0 0 1 .364-.49c.407-.45 1.503.368 1.118.916-.15.212-.414.273-.661.24-.336-.046-.806-.273-.822-.668l.001.002ZM21.38 21.45c.077-.072.197-.07.31-.025.084-.043.178-.003.243.058.094.09.152.249.054.356a.14.14 0 0 1-.045.073c-.172.132-.456.049-.6-.101-.119-.125-.085-.29.04-.36h-.002ZM18.769 24.757c.138-.037.42.201.235.25-.138.038-.419-.2-.235-.25ZM36.906 12.025a.321.321 0 0 1 .163-.01 6.562 6.562 0 0 0-.008-.032c-.017-.13.203-.083.259-.059.176.079.344.282.225.476-.181.288-.636.07-.734-.18-.033-.083.02-.167.095-.195ZM45.313 11.47c.005-.127.146-.18.25-.185a.511.511 0 0 1 .396.16c.061.065.147.23.035.297-.036.02-.069.042-.11.053-.034.009-.065.018-.1.02-.008.001-.011 0-.017-.002-.114.049-.26-.037-.34-.11-.062-.056-.119-.143-.114-.23v-.003ZM43.592 10.356a.217.217 0 0 1 .122-.077l.048-.013a.774.774 0 0 0 .015-.004c.24-.025.634.25.399.455-.085.072-.233.02-.31-.037a.566.566 0 0 1-.172-.137.29.29 0 0 1-.055-.108c-.039-.018-.07-.05-.045-.08l-.002.001Z"/></svg>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <EndOfRound
      :totalScore="totalScore"
      :sortedScores="sortedScores"
      :summary="summary"
      @end-round="endRound"
    />
  </div>

</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineEmits, reactive, watch } from "vue";
import { useGameLogic } from "./useGameLogic.js";
import gsap from 'gsap'
import axios from "axios";
import tmi from "tmi.js";

import FoundWords from "./common/FoundWords.vue";
import EndOfRound from "./common/EndOfRound.vue";
import ProgressBar from "./common/ProgressBar.vue";

import otterImage from "/public/images/otter.webp";
import cartoonTroutImage from "/public/images/cartoon_trout.webp";
import scoreImage from "/public/images/score-illustration.png";


const emit = defineEmits(["round-ended"]);

const {
  channelName,
  timeLeft,
  sortedScores,
  progressBarWidth,
  reversedCorrectGuess,
  reversedIncorrectGuess,
  correctGuess,
  incorrectGuess,
  scores,
  sounds,
} = useGameLogic();

const client = ref(null);
const timer = ref(null);
const categoryTimer = ref(null);
const messages = ref([]);
const foundWords = ref([]);
const selectedCategory = ref("");
const startLetter = ref("");
const totalScore = ref(0);
const lock = ref(false);
const userMessage = ref("");
const summary = ref({
  startingLetters: [],
  categories: [],
  incorrectGuesses: [],
});

const fetchChannelNameAndConnect = async () => {
  connectChat(channelName.value);
};

const tweened = reactive({
  totalScore: 0
})

watch(totalScore, (n) => {
  gsap.to(tweened, { duration: 0.7, totalScore: Number(n) || 0 })
})


const selectRandomCategoryAndLetter = async () => {
  const categories = [
    "animaux",
    "metiers",
    "prenoms",
    "pays",
    "adverbes",
    "anatomie",
    "fromages",
    "qualitedefaut",
    "vegetaux",
  ];
  selectedCategory.value =
    categories[Math.floor(Math.random() * categories.length)];
  summary.value.categories.push(selectedCategory.value);
  fetchValidWords();
};

const fetchValidWords = async () => {
  try {
    sounds.value[1]?.play();
    const response = await axios.get(`/data/${selectedCategory.value}.json`);
    const categoryLetters = response.data["Letters"];
    startLetter.value =
      categoryLetters[Math.floor(Math.random() * categoryLetters.length)];
    summary.value.startingLetters.push(startLetter.value);
    summary.value.incorrectGuesses.push({
      category: selectedCategory.value,
      letter: startLetter.value,
      guesses: [],
    });
    const wordsByLetter = response.data[startLetter.value] || [];
    foundWords.value = wordsByLetter;
    console.log(foundWords.value);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

const normalizeText = (text) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

const checkGuess = async (message, username) => {
  if (lock.value) return;
  lock.value = true;
  const normalizedMessage = normalizeText(message);
  const lowerCaseFoundWords = foundWords.value.map((word) =>
    normalizeText(word)
  );
  if (lowerCaseFoundWords.includes(normalizedMessage)) {
    correctGuess.value.push({ text: message, username });
    sounds.value[2]?.play();
    if (!scores.value[username]) {
      scores.value[username] = 0;
    }
    scores.value[username] += 5;
    totalScore.value += 5;
    foundWords.value = foundWords.value.filter(
      (word) => normalizeText(word) !== normalizedMessage
    );
  } else {
    incorrectGuess.value.push({
      text: message,
      id: incorrectGuess.value.length + 1,
    });
    const currentGroup = summary.value.incorrectGuesses.find(
      (group) =>
        group.category === selectedCategory.value &&
        group.letter === startLetter.value
    );
    if (currentGroup) {
      currentGroup.guesses.push(message);
    }
  }
  lock.value = false;
};

const handleUserMessage = () => {
  if (userMessage.value.trim() !== "") {
    const username = channelName.value;
    messages.value.push({
      id: messages.value.length + 1,
      username: username,
      text: userMessage.value,
    });
    checkGuess(userMessage.value, username);
    userMessage.value = "";
  }
};

const startTimer = () => {
  timer.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(categoryTimer.value);
      clearInterval(timer.value);
    }
  }, 1000);
};

const endRound = () => {
  if (client.value) {
    client.value.disconnect();
  }
  clearInterval(categoryTimer.value);
  clearInterval(timer.value);
  emit("round-ended", {
    total: totalScore.value,
    scores: scores.value,
    summary: {
      startingLetters: summary.value.startingLetters,
      categories: summary.value.categories,
      incorrectGuesses: summary.value.incorrectGuesses,
    },
  });
};

const connectChat = (channel) => {
  if (client.value) {
    client.value.disconnect();
  }
  const opts = {
    connection: {
      secure: true,
      reconnect: true,
    },
    channels: [channel],
  };
  client.value = new tmi.Client(opts);
  client.value.on("message", (channel, tags, message, self) => {
    if (self) return;
    messages.value.push({
      id: messages.value.length + 1,
      username: tags["display-name"],
      text: message,
    });
    checkGuess(message, tags["display-name"]);
  });
  client.value.connect().catch(console.error);
};

const formatCategories = (selectedCategory) => {
  const categoryMap = {
    animaux: "animaux",
    anatomie: "parties du corps",
    fromages: "fromages",
    prenoms: "prénoms",
    metiers: "métiers",
    pays: "pays",
    vegetaux: "végétaux",
    qualitedefaut: "qualités & défauts",
    adverbes: "adverbes en -ment",
  };
  return categoryMap[selectedCategory] || selectedCategory;
};

onMounted(() => {
  fetchChannelNameAndConnect();
  selectRandomCategoryAndLetter();
  startTimer();
  categoryTimer.value = setInterval(() => {
    if (timeLeft.value > 0) {
      if (timeLeft.value % 30 === 4) {
        sounds.value[0]?.play();
      }
      if (timeLeft.value % 30 === 0) {
        selectRandomCategoryAndLetter();
      }
    }
  }, 1000);
});

onBeforeUnmount(() => {
  if (client.value) {
    client.value.disconnect();
  }
  clearInterval(categoryTimer.value);
  clearInterval(timer.value);
});
</script>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transform: scale(0%);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: scale(100%);
}
</style>
