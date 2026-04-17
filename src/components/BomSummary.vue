<template>
  <section class="bom-summary">
    <h2 class="title">
      BOM 物料清單預估
      <span class="title__count">總計 {{ totalCount }} 項</span>
    </h2>
    <v-table class="table" fixed-header>
      <thead>
        <tr>
          <th v-for="col of columns" :key="col">{{ col }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item of list" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.color }}</td>
          <td>${{ item.basePrice }} x{{ item.multiplier }}</td>
          <td :style="{ color: '#9fcdcd' }">
            ${{
              Decimal.mul(item.basePrice, item.multiplier)
                .toNumber()
                .toLocaleString()
            }}
          </td>
        </tr>
      </tbody>
    </v-table>
    <div class="total-price">
      專案總估價: <span>{{ totalPrice }}</span>
    </div>
  </section>
</template>
<script setup lang="ts">
  import Decimal from 'decimal.js';

  import { computed } from 'vue';
  import { type List, type Item } from '../types/type';
  const { list } = defineProps<{
    list: List;
  }>();

  const totalCount = computed(() => list.length);
  const totalPrice = computed(() =>
    list
      .reduce((acc: number, item: Item) => {
        return acc + Decimal.mul(item.basePrice, item.multiplier).toNumber();
      }, 0)
      .toLocaleString(),
  );
  const columns = ['零件名稱', '顏色預覽', '單價x加成', '小計'];
</script>
<style lang="scss" scoped>
  .bom-summary {
    padding: 0;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    background-color: #fff;
    font-weight: bold;

    .title {
      margin-bottom: 0;
      padding: 20px 20px 0 20px;

      display: flex;
      justify-content: space-between;

      &__count {
        font-size: 1rem;
        color: var(--text);
      }
    }

    .table {
      padding: 0 20px;
      border-radius: 0px;

      max-height: min(60%, 270px);
      flex: 1;
      th,
      td {
        padding: 0 10px;
        line-height: normal;
        text-align: left;
        &:last-child {
          text-align: right;
        }
      }
      th {
        background-color: #f6f9fa;
      }
    }
    .total-price {
      flex: 1;

      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      border-radius: 10px;
      padding: 0 20px;
      background-color: #f6f9fa;
      text-align: right;
      font-size: 1.5rem;
      span {
        color: #4aa089;
      }
    }
  }
</style>
