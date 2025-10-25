<template>
    <h1>Vista principal</h1>
    <div class="container">
        <ul class="list-group">
            <li class="list-group-item">Vehiculos dentro: {{ metrics.vehiclesCurrentlyInside }}</li>
            <li class="list-group-item">Porcentaje de ocupación: {{ metrics.occupationPercentage }}</li>
            <li class="list-group-item">Ingresos de hoy: ${{ metrics.incomeToday }}</li>
            <li class="list-group-item">Membresias activas: {{ metrics.membershipsActive }}</li>
            <li class="list-group-item">Membresias próximas a expirar: {{ metrics.membershipsExpiringSoon }}</li>
            <li class="list-group-item">Membresias expiradas: {{ metrics.membershipsExpired }}</li>
        </ul>
    </div>
</template>


<script>
export default {
    name: 'HomeView',
    data() {
        return {
            metrics: {}
        }
    },
    methods: {
        async getMetrics() {
            try {
                const response = await this.$axios.get('/Dashboard/metrics')
                this.metrics = response.data;
                console.log('Metricas:', this.metrics)
            } catch (error) {
                console.log('Error al cargar las métricas')
                console.log(error)
            }
        }
    },
    mounted() {
        this.getMetrics();
    },

}

</script>