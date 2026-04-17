<template>
  <section class="material-editor">
    <h2 class="title">材質與屬性編輯器</h2>
    <form class="form">
      <div class="form__color">
        <label for="color">材質顏色(Albedo Color)</label>
        <div class="container">
          <input
            id="color"
            type="color"
            :value="currentMaterial.color"
            @change="
              ($event) =>
                $emit('updateColor', ($event.target as HTMLInputElement)?.value)
            "
          />
          <div
            class="palette"
            :style="{
              'background-color': currentMaterial.color,
            }"
          ></div>
          <span class="name">{{ currentMaterial.color }}</span>
        </div>
      </div>
      <div class="form__price">
        <label for="price">基礎售價(Base Price)</label>
        <input
          id="price"
          type="number"
          :readonly="true"
          :value="currentMaterial.basePrice"
        />
      </div>
      <div class="form__multiplier">
        <label for="multiplier"
          ><span>材質複雜度加成(Multiplier)</span
          ><span>{{ inputMultiplier }}x</span></label
        >
        <v-slider
          id="multiplier"
          style="width: 100%"
          min="1"
          max="5"
          step="0.1"
          v-model="inputMultiplier"
          track-color="#eee"
          color="#cfeaf2"
          thumb-color="#019a6f"
          :hide-details="true"
          @end="handleUpdateMultiplier"
        ></v-slider>
        <div class="range"><span>基礎(1.0x)</span><span>極高(5.0x)</span></div>
      </div>
    </form>
  </section>
</template>
<script setup lang="ts">
  import { shallowRef, watch } from 'vue';
  import { useDebounceFn } from '@vueuse/core';
  import { type Item } from '../types/type';

  const { currentMaterial } = defineProps<{
    currentMaterial: Item;
  }>();
  const emit = defineEmits<{
    (e: 'updateColor', color: string): void;
    (e: 'updateMultiplier', multiplier: number): void;
  }>();

  const debouncedFn = useDebounceFn((value: number) => {
    emit('updateMultiplier', value);
  }, 200);
  const inputMultiplier = shallowRef(currentMaterial.multiplier);
  function handleUpdateMultiplier(value: number) {
    inputMultiplier.value = value;
    debouncedFn(value);
  }
  watch(
    () => currentMaterial,
    (newMaterial) => {
      if (newMaterial) inputMultiplier.value = newMaterial.multiplier;
    },
  );
</script>
<style lang="scss" scoped>
  .material-editor {
    background-color: #fff;
    .form {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      grid-template-areas:
        'color price'
        'multiplier multiplier';
      column-gap: 10px;
      row-gap: 10px;

      label {
        color: #000;
        font-weight: bold;
      }

      &__color,
      &__price,
      &__multiplier {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      &__color {
        grid-area: color;

        .container {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          column-gap: 3px;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 5px;

          &::before {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 8px;
            background-color: #fff;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
            pointer-events: none;
          }

          #color {
            width: 100%;
            height: 100%;
            border: none;
            position: absolute;
            z-index: 0;
            left: 0;
            top: 0;
            background-color: transparent;
            border-radius: 8px;
            cursor: pointer;

            &:hover,
            &:focus {
              box-shadow: 0 0 5px rgb(87, 191, 226);
              outline: 0;
            }
          }

          .palette {
            width: 22px;
            height: 22px;
            border-radius: 5px;
            position: relative;
            z-index: 1;
          }

          .name {
            position: relative;
            z-index: 1;
          }
        }
      }
      &__price {
        grid-area: price;

        #price {
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 5px;

          &:focus-visible {
            box-shadow: 0 0 5px rgb(87, 191, 226);
            outline: 0;
          }
        }
      }
      &__multiplier {
        grid-area: multiplier;

        label {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }

        .range {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
</style>
