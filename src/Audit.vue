<template>
    <v-row>
        <v-col>
            <v-row>
                <v-col v-for="(item, n) in faces" :key="n" cols="12" md="4">
                    <v-card class="pa-2" outlined>
                        <v-list two-line>
                            <v-list-item>
                                <v-list-item-avatar>
                                    <v-img :src="item.face"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>{{ item.status }}</v-list-item-title>
                                    <v-list-item-subtitle>{{ item.date }}</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn icon @click="item.shown = !item.shown">
                                        <v-icon>{{ item.shown ? 'expand_less' : 'expand_more' }}</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>

                        <v-card-actions>
                            <v-progress-linear background-color="danger" color="success" value="15"></v-progress-linear>
                        </v-card-actions>
                        
                        <v-list three-line flat>
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-title>{{ item.reason }}</v-list-item-title>
                              <v-list-item-subtitle>{{ item.scepticism }} possibly a spoof</v-list-item-subtitle>
                              <v-list-item-subtitle>From {{ item.device }}</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>

                        <v-container>
                          <v-switch dense v-model="item.isSpoof" label="Mark as spoof" inset></v-switch>
                          <v-divider inset></v-divider>
                          <v-switch dense v-model="item.add" label="Add to Set" inset></v-switch>
                        </v-container>
                        
                        <v-expand-transition>
                            <div v-show="item.shown">
                                <v-divider></v-divider>
                                <v-list two-line dense>
                                    <v-subheader>Similar faces</v-subheader>
                                    <v-list-item v-for="(similar, n) in item.similar" :key="n">
                                        <v-list-item-avatar>
                                            <v-img :src="similar.face"></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title>{{ similar.weight }}</v-list-item-title>
                                            <v-list-item-subtitle>{{ similar.user }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="3">
            <v-list>
                <v-subheader>Filter audit entries</v-subheader>
                <v-list-item>
                    <v-list-item-content>
                        <v-row>
                            <v-col cols="12">
                                <v-select dense :items="datetimes" label="Date range" outlined></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-select dense :items="devices" label="Device" outlined></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-select dense :items="failures" label="Type of failure" outlined></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-select dense :items="confidence" label="Confidence" outlined></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-select dense :items="status" label="Status" outlined></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-btn color="success" block dark elevation="0">Filter Search</v-btn>
                            </v-col>
                        </v-row>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-col>
    </v-row>
</template>

<script>
export default {
  data: () => ({
    datetimes: ['LastMonth', 'Last2Months', 'Last3Months', 'Last6Months'],
    devices: ['device1', 'device2', 'device3', 'device4'],
    failures: ['Liveness above threshold', 'Liveness below threshold'],
    confidence: ['6%', '7%', '11%', '13%', '73%', '86%'],
    status: ['Recognised', 'Spoof'],
    faces: [
      {shown: false, status: 'Recognised', reason: 'Liveness above threshold', scepticism: '13%', isSpoof: false, add: false, date: '14-08-2020 14:08', face: 'https://cdn.vuetifyjs.com/images/lists/1.jpg', device: 'device1', similar: [
        {weight: '94%', user: 'Saagar Enjeti', face: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {weight: '67%', user: 'Krystal Ball', face: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {weight: '18%', user: 'Marques Brownley', face: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'}
      ]},
      {shown: false, status: 'Spoof', reason: 'Liveness below threshold', scepticism: '73%', isSpoof: false, add: false, date: '20-05-2020 20:05', face: 'https://cdn.vuetifyjs.com/images/lists/2.jpg', device: 'device1', similar: [
        {weight: '94%', user: 'Jimmy Dore', face: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {weight: '67%', user: 'Jaspreet Singh', face: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
        {weight: '18%', user: 'Saagar Enjeti', face: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'}
      ]},
      {shown: false, status: 'Recognised', reason: 'Liveness above threshold', scepticism: '6%', isSpoof: false, add: false, date: '09-11-2020 09:11', face: 'https://cdn.vuetifyjs.com/images/lists/3.jpg', device: 'device1', similar: [
        {weight: '94%', user: 'Krystal Ball', face: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
        {weight: '67%', user: 'Marques Brownley', face: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'},
        {weight: '18%', user: 'Jimmy Dore', face: 'https://cdn.vuetifyjs.com/images/john.jpg'}
      ]},
      {shown: false, status: 'Recognised', reason: 'Liveness above threshold', scepticism: '11%', isSpoof: false, add: false, date: '04-02-2020 16:02', face: 'https://cdn.vuetifyjs.com/images/lists/4.jpg', device: 'device1', similar: [
        {weight: '94%', user: 'Jaspreet Singh', face: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'},
        {weight: '67%', user: 'Saagar Enjeti', face: 'https://cdn.vuetifyjs.com/images/john.png'},
        {weight: '18%', user: 'Krystal Ball', face: 'https://cdn.vuetifyjs.com/images/john.jpg'}
      ]},
      {shown: false, status: 'Spoof', reason: 'Liveness below threshold', scepticism: '86%', isSpoof: false, add: false, date: '16-04-2020 04:04', face: 'https://cdn.vuetifyjs.com/images/lists/5.jpg', device: 'device1', similar: [
        {weight: '94%', user: 'Marques Brownley', face: 'https://cdn.vuetifyjs.com/images/john.png'},
        {weight: '67%', user: 'Jimmy Dore', face: 'https://cdn.vuetifyjs.com/images/john.jpg'},
        {weight: '18%', user: 'Jaspreet Singh', face: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'}
      ]},
      {shown: false, status: 'Recognised', reason: 'Liveness above threshold', scepticism: '7%', isSpoof: false, add: false, date: '13-05-2020 13:50', face: 'https://cdn.vuetifyjs.com/images/john.png', device: 'device1', similar: [
        {weight: '94%', user: 'Saagar Enjeti', face: 'https://cdn.vuetifyjs.com/images/john.jpg'},
        {weight: '67%', user: 'Krystal Ball', face: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
        {weight: '18%', user: 'Marques Brownley', face: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'}
      ]},
    ],
    spoof: false,
  }),
};
</script>
