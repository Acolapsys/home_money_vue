<template>
  <v-simple-table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ 'Amount' | localize }}</th>
        <th>{{ 'Date' | localize }}</th>
        <th>{{ 'Category' | localize }}</th>
        <th>{{ 'Type' | localize }}</th>
        <th>{{ 'Open' | localize }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) of records" :key="record.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ record.amount | currency }}</td>
        <td>{{ record.date | date('datetime') }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white--text badge pa-1" :class="record.typeClass">{{
            record.typeText
          }}</span>
        </td>
        <td>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                class="success"
                dark
                @click="$router.push(`detail/${record.id}`)"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </template>
            <span>{{ 'Message_OpenRecord' | localize }}</span>
          </v-tooltip>
        </td>
      </tr>
    </tbody>
  </v-simple-table>
</template>
<script>
export default {
  name: 'HistoryTable',
  props: {
    records: {
      required: true,
      type: Array
    }
  }
}
</script>
