<template>
    <h1>Operadores</h1>
    <div class="container">
        <form @submit.prevent="saveChanges">
            <h2>{{ editingOperator.operatorId ? 'Edit Operator' : 'Create operator' }}</h2>
            <div class="mb-3">
                <label for="fullName" class="form-label">Full Name</label>
                <input type="text" class="form-control" id="fullName" v-model="operatorForm.fullName">
            </div>
            <div class="mb-3">
                <label for="Email" class="form-label">Email</label>
                <input type="email" class="form-control" id="Email" v-model="operatorForm.email">
            </div>
            <div class="mb-3" v-if="!editingOperator.operatorId">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" v-model="operatorForm.password">
            </div>
            <div class="mb-3">
                <label class="form-check-label" for="isActive">State</label>
                <input type="checkbox" class="form-check-input" id="isActive" v-model="operatorForm.isActive">
            </div>
            <button type="submit" class="btn btn-primary" @click="saveChanges">Submit</button>
            <button v-if="editingOperator.operatorId" type="button" class="btn btn-secondary"
                @click="cancelEdit">Cancelar</button>
        </form>
        <table class="table table-responsive table-hover">
            <thead>
                <tr>
                    <th scope="col">Full Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">State</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="op in operators" :key="op.operatorId">
                    <td>{{ op.fullName }}</td>
                    <td>{{ op.email }}</td>
                    <td>{{ op.isActive ? 'Activo' : 'Inactivo' }}</td>
                    <td>
                        <button class="btn btn-warning" @click="editOperator(op)">Editar</button>
                        <button class="btn btn-danger" @click="changeStatus(op)">Desactivar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
export default {
    name: 'Operators',
    data() {
        return {
            operators: [],
            operatorForm: {
                fullName: '',
                password: '',
                email: '',
                isActive: true
            },
            editingOperator: {}
        }
    },
    methods: {
        async getOperators() {
            const operators = await this.$axios.get('/Operators')
            this.operators = operators.data
        },
        async editOperator(operator) {
            this.editingOperator = { ...operator }
            this.operatorForm.fullName = operator.fullName
            this.operatorForm.email = operator.email
            this.operatorForm.isActive = operator.isActive
            this.operatorForm.password = ''
        },
        resetForm() {
            this.operatorForm = {
                password: '',
                fullName: '',
                email: '',
                isActive: true,
            };
            this.editingOperator = {};
        },
        cancelEdit() {
            this.resetForm();
        },
        async saveChanges() {
            try {
                if (this.editingOperator.operatorId) {
                    const payload = {
                        fullName: this.operatorForm.fullName,
                        email: this.operatorForm.email,
                        isActive: this.operatorForm.isActive
                    };
                    await this.$axios.put(`/Operators/${this.editingOperator.operatorId}`, payload);
                    alert('Operador actualizado con éxito!');
                } else {
                    const payload = {
                        password: this.operatorForm.password,
                        fullName: this.operatorForm.fullName,
                        email: this.operatorForm.email
                    };
                    await this.$axios.post('/Operators', payload);
                    alert('Operador registrado con éxito!');
                }
                this.resetForm();
                await this.getOperators();
            } catch (err) {
                console.error('Error al guardar operador:', err.response?.data || err.message);
            }
        }
    },
    mounted() {
        this.getOperators();
    },
}
</script>