import React, { useState } from 'react';
import Input from '../components/input';

export const CategoryFormPage = () => {
    const [form, setForm] = useState({
        id: null,
        name: ''
    });
    const [errors, setErrors] = useState({});
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState({});

    return (
        <div className="container">
            <h1 className="text-center">Cadastro de Categoria</h1>
            <div className="col-12 mb-3">
                <Input
                    name="name"
                    label="Name"
                    placeholder="Informe o nome"
                    value={form.name}
                    onChange={onChange}
                    hasError={errors.name && true}
                    error={errors.name}
                />
            </div>

        </div>
    );
}

export default CategoryFormPage;