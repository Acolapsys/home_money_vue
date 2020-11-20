<template>
  <v-card flat>
    <v-card-title>
      <h2 class="display-1">Счет</h2>
      <v-spacer></v-spacer>
      <v-btn color="orange" dark>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-container fluid>
      <v-row>
        <v-col sm="12" md="6" lg="4">
          <v-card color="light-blue" height="310px" class="white--text pa-4">
            <v-card-title class="font-weight-light ">
              <span>Счет в валюте</span>
            </v-card-title>
            <v-card-text style="border-bottom: 2px solid white">
              <span class="headline white--text"> 12.0 Р</span></v-card-text
            >
          </v-card>
        </v-col>
        <v-col sm="12" md="6" lg="8">
          <v-card height="310px" class="orange darken-3 white--text pa-4">
            <v-card-title class="font-weight-light ">
              <span>Курс валют</span>
            </v-card-title>
            <v-simple-table class="orange darken-3 white--text" dark>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="white--text">Валюта</th>
                    <th class="white--text">Курс</th>
                    <th class="white--text">Дата</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>руб</td>
                    <td>12121</td>
                    <td>12.12.12</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
