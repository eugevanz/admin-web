<style scoped>
    .v-input--switch__track {
        opacity: 0.85 !important
    }
    .v-label{
        color:white !important
    }
</style>

<template>
    <v-card outlined>
        <v-card class="pa-2" flat>
            <v-img src="@/assets/logo.png" class="white--text align-end" style="max-height:250px">
                <v-card-title style="text-shadow: 0px 0px 5px #000, 0 0px 5px #000, 0 0px 5px #000, 0px 0 5px #000">
                    item.status item.createdDateTime
                </v-card-title>
            </v-img>
            <div style="position:absolute; top:0px; right:0px;">
                <img src="@/assets/spoof.gif" style="width:100px;height:100px" v-if="isSpoof" />
                <img src="@/assets/real.gif" style="width:100px;height:100px" v-if="!isSpoof" />
            </div>
        </v-card>

        <v-hover v-slot="{ hover }" open-delay="200">
            <v-card flat>
                <v-card-subtitle class="pb-0">item.deviceName</v-card-subtitle>
                <v-card-text class="text--primary">
                    <v-row>
                        <v-col cols="6" style="text-align:center">
                            <h3>Real Confidence</h3>
                        </v-col>
                        <v-col cols="6" style="text-align:center">
                            <h3>Spoof Confidence</h3>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6" style="text-align:center">
                            <v-progress-circular :rotate="360" :size="80" :width="15" value="75" color="success">75</v-progress-circular>
                        </v-col>
                        <v-col cols="6" style="text-align:center">
                            <v-progress-circular :rotate="360" :size="80" :width="15" :value="46" color="error">46</v-progress-circular>
                        </v-col>
                    </v-row>

                    <v-fade-transition>
                        <v-overlay absolute opacity="1.0" v-if="hover">                           
                            <h4>Mark spoof review as:</h4>
                            <v-switch v-model="isIncorrectResult" label="Wrong" id="wrongSwitch" color="error" />
                            <v-switch v-model="isTestSetCandidate" label="Test Candidate" color="primary" />
                        </v-overlay>
                    </v-fade-transition>
                    <v-overlay absolute :value="loading">
                        <v-progress-circular indeterminate size="32"></v-progress-circular>
                    </v-overlay>
                </v-card-text>
            </v-card>
        </v-hover>
    </v-card>
</template>

<script>
    // import auditApi from '../services/api-audit-service';

    export default {
        props: ['item'],
        // mixins: [auditApi],
        data() {
            return {
                loading: false,
                isSpoof: false,
                isIncorrectResult: false,
                isTestSetCandidate: false
            }
        },
        methods: {
            // updateAudit(item) {
            //     this.loading = true;

            //     this.putUpdateAudit({
            //         id: item.id,
            //         isIncorrectResult: item.isIncorrectResult,
            //         isTestSetCandidate: item.isTestSetCandidate
            //     }, this.updateAuditCallback)
            // },
            // updateAuditCallback(successfull, result) {
            //     this.loading = false
            // }

        },
    }
</script>