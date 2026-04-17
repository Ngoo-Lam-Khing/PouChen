<template>
  <MeshList :list="list" v-model:currentMeshId="currentMeshId" />
  <MaterialEditor
    v-if="currentMaterial"
    :currentMaterial="currentMaterial"
    @updateColor="updateColor"
    @updateMultiplier="updateMultiplier"
  />
  <BomSummary :list="list" />
</template>
<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { type List } from './types/type';
  import MeshList from './components/MeshList.vue';
  import MaterialEditor from './components/MaterialEditor.vue';
  import BomSummary from './components/BomSummary.vue';
  // user chosen mesh
  const currentMeshId = ref<null | string>(null);
  // user chosen material
  const currentMaterial = computed(() =>
    list.value.find((item) => item.id === currentMeshId.value),
  );
  function updateColor(color: string): void {
    const item = list.value.find((item) => item.id === currentMeshId.value);
    if (item) {
      item.color = color;
    }
  }
  function updateMultiplier(multiplier: number): void {
    const item = list.value.find((item) => item.id === currentMeshId.value);
    if (item) {
      item.multiplier = multiplier;
    }
  }
  // fetch list data
  const list = ref<List>([]);
  async function fetchList() {
    try {
      const res = await fetch('/api/v1/mesh-list');
      const data = await res.json();
      list.value = data;
    } catch (err) {
      console.error(err);
    }
  }
  onMounted(async () => {
    await fetchList();
    currentMeshId.value = list.value[0].id;
  });
</script>
<style lang="scss">
  html {
    background-color: #f5f9fa;
  }
  #app {
    padding: 50px 30px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'mesh-list material-editor'
      'mesh-list bom-summary';
    gap: 25px;
  }
  .mesh-list,
  .material-editor,
  .bom-summary {
    min-height: 0;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 2px 2px 10px #b2b2b2;

    .title {
      margin-bottom: 20px;
      text-align: left;
      color: #000;
    }
  }
  .mesh-list {
    grid-area: mesh-list;
  }
  .material-editor {
    grid-area: material-editor;
  }
  .bom-summary {
    grid-area: bom-summary;
  }
</style>
