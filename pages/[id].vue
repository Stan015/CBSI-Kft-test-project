<script lang="ts" setup>
const route = useRoute();
const store = useCardsStore();
const { cards } = storeToRefs(store);

const cardId = Number(route.params.id);
const card = computed(() => cards.value.find((c) => c.id === cardId));
</script>

<template>
  <main>
    <section class="flex gap-4 justify-between items-center my-4 px-[5%]">
      <h1 class="font-bold text-3xl max-sm:text-2xl">Single Note</h1>
      <AddNewCardBtn />
    </section>

    <section
      class="flex flex-col justify-center items-center px-[5%] gap-6 w-full"
    >
      <div class="flex flex-col gap-4 w-[35rem] max-md:w-[30rem] max-sm:w-full">
        <Card
          v-if="card"
          :key="card.id"
          :card="card"
          :isLink="false"
          :wrapperClass="'bg-white shadow-lg rounded-2xl p-6 w-full !max-h-full h-auto hover:shadow-xl transition-all duration-300 hover:transform hover:scale-102'"
          :titleClass="'text-lg font-bold mb-4'"
          :imageClass="'w-full h-60 object-cover rounded-2xl mb-4'"
          :descriptionClass="'text-primary mb-4 whitespace-pre-line h-auto !line-clamp-none !truncate-none'"
        />
        <div v-else class="col-span-4 text-center text-primary py-10">
          Note not found.
        </div>

        <div v-if="card" class="flex items-center justify-between">
          <Button
            class="bg-red hover:bg-red/95 transition-all text-white hover:scale-95"
            @click="
              () => {
                store.removeCard(cardId);
                $router.push('/');
              }
            "
            >Delete Note</Button
          >

          <UpdateCardBtn
            :card="card"
            title="Edit Note"
            title-class="bg-blue hover:bg-blue/95 transition-all text-white hover:scale-95"
          />
        </div>
        <Button
          class="bg-green text-white rounded-full px-4 py-2 hover:bg-green/95 hover:scale-95 transition-all"
          @click="$router.push('/')"
        >
          Back to Notes
        </Button>
      </div>
    </section>
  </main>
</template>
