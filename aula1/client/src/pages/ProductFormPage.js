import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from '../components/input';
import ProductService from '../services/ProductService';
import CategoryService from '../services/CategoryService';


export const ProductFormPage = () => {
    const [form, setForm] = useState({
        id: null,
        name: '',
        price: null,
        description: '',
        category: null
    });
    const [errors, setErrors] = useState({});
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState();
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            ProductService.findOne(id).then((response) => {
                if (response.data) {
                    setForm({
                        id: response.data.id,
                        name: response.data.name,
                        price: response.data.price,
                        description: response.data.description,
                        category: response.data.category.id
                    });
                    setApiError();
                } else {
                    setApiError('Falha ao carregar o produto');
                }
            }).catch((erro) => {
                setApiError('Falha ao carregar o produto');
            });
        }
        CategoryService.findAll().then((response) => {
            setCategories(response.data);
            if (!form.category.id) {
                setForm((previousForm) => {
                    return {
                        ...previousForm,
                        category: response.data[0].id,
                    };
                });
            }
            setApiError();
        }).catch((erro) => {
            setApiError('Falha ao carregar a combo de categorias.');
        });
    }, [id]);

    const onChange = (event) => {
        const { value, name } = event.target;
        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: value,
            };
        });
        setErrors((previousErrors) => {
            return {
                ...previousErrors,
                [name]: undefined,
            };
        });
    };

    const onSubmit = () => {
        const product = {
            id: form.id,
            name: form.name,
            price: form.price,
            description: form.description,
            category: { id: form.category }
        };
        setPendingApiCall(true);
        ProductService.save(product).then((response) => {
            setPendingApiCall(false);
            navigate('/products');
        }).catch((error) => {
            if (error.response.data && error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            } else {
                setApiError('Falha ao salvar o produto.');
            }
            setPendingApiCall(false);
        });
    };

    return (
        <div className="container">
            <h1 className="text-center">Cadastro de Produtos</h1>
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
            <div className="col-12 mb-3">
                <Input
                    name="price"
                    label="Preço"
                    placeholder="Informe o preço"
                    value={form.price}
                    onChange={onChange}
                    hasError={errors.price && true}
                    error={errors.price}
                />
            </div>
            <div className="col-12 mb-3">
                <label>Descrição</label>
                <textarea
                    className="form-control"
                    name="description"
                    placeholder="Informe a descrição"
                    value={form.description}
                    onChange={onChange}
                ></textarea>
                {errors.description && (
                    <div className="invalid-feedback d-block">{errors.description}</div>
                )}
            </div>
            <div className="col-12 mb-3">
                <label>Categoria</label>
                <select
                    className="form-control"
                    name="category"
                    value={form.category}
                    onChange={onChange}
                >
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                {errors.category && (
                    <div className="invalid-feedback d-block">{errors.category}</div>
                )}
            </div>
            <div className="text-center">
                <ButtonWithProgress
                    onClick={onSubmit}
                    disabled={pendingApiCall ? true : false}
                    pendingApiCall={pendingApiCall}
                    text="Salvar"
                />
            </div>
            {apiError && (<div className="alert alert-danger">{apiError}</div>)}
            <div className="text-center">
                <Link to="/products">Voltar</Link>
            </div>
        </div>
    );
};
export default ProductFormPage;