<template>
  <section class="mesh-list">
    <h2 class="title">模型零件清單</h2>
    <ul class="list">
      <li class="mesh" v-for="item of list" :key="item.id">
        <div class="mesh__left">
          <div class="mesh__name">{{ item.name }}</div>
          <div class="mesh__cate">{{ item.category }}</div>
        </div>
        <div class="mesh__right">
          <span class="mesh__price"
            >$
            {{
              Decimal.mul(item.basePrice, item.multiplier)
                .toNumber()
                .toLocaleString()
            }}</span
          >
          <input
            class="mesh__radio"
            type="radio"
            :style="{
              'accent-color': item.color,
            }"
            :value="item.id"
            :checked="item.id === currentMeshId"
            v-model="currentMeshId"
          />
        </div>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
  import Decimal from 'decimal.js';
  import { type List } from '../types/type';
  defineProps<{
    list: List;
  }>();

  const currentMeshId = defineModel('currentMeshId');
</script>
<style lang="scss">
  .mesh-list {
    background-color: #edeef3;

    .list {
      height: 90%;
      overflow: auto;

      padding: 0;

      .mesh {
        margin-bottom: 1rem;
        border-radius: 10px;
        padding: 0.3rem 0.9rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        background-color: #fff;

        &__left {
          text-align: left;
        }

        &__name,
        &__price {
          color: #000;
          font-weight: bold;
        }

        &__cate {
          font-size: 0.8rem;
          font-weight: bold;
        }

        &__right {
          display: flex;
          align-items: center;
        }
        &__radio {
          margin-left: 10px;
          width: 1.2rem;
          height: 1.2rem;
          cursor: pointer;
        }
      }
    }
  }
</style>
