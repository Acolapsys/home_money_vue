<template>

 <v-card flat>
    <v-card-title>
      <h2 class="display-1">История записей</h2>      
    </v-card-title>
    <v-divider></v-divider>
     <div class="history-chart">
      <canvas></canvas>
    </div>

    <v-simple-table >
        <thead>
          <tr>
            <th>#</th>
            <th>Сумма</th>
            <th>Дата</th>
            <th>Категория</th>
            <th>Тип</th>
            <th>Открыть</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>1212</td>
            <td>12.12.32</td>
            <td>name</td>
            <td>
              <span class="white--text badge red pa-1">Расход</span>
            </td>
            <td>
              <v-btn small class="orange" dark>
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>

 </v-card>
 
</template>
