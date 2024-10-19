import React, { useEffect, useState } from 'react';
import { loadRoles, createRoleHandler, updateRoleHandler, deleteRoleHandler } from '../components/rol'; 
import '../Styles/rol.css';
import Navbar from '../components/Navbar';

const RolPage = () => {
    const [roles, setRoles] = useState([]);
    const [createMode, setCreateMode] = useState(false);
    const [newRole, setNewRole] = useState({ nombre_rol: '' });
    const [editingRole, setEditingRole] = useState(null); // Estado para el rol en edición
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        loadRoles(setRoles);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRole(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCreateRole = async (e) => {
        e.preventDefault();
        await createRoleHandler(newRole, setRoles, setCreateMode);
        setNewRole({ nombre_rol: '' });
    };

    const handleEditRole = (role) => {
        setNewRole({ nombre_rol: role.nombre_rol }); // Cargar los datos del rol en el formulario
        setEditingRole(role); // Establecer el rol que se está editando
        setCreateMode(true); // Cambiar a modo de creación (para editar)
    };

    const handleUpdateRole = async (e) => {
        e.preventDefault();
        await updateRoleHandler({ ...editingRole, ...newRole }, loadRoles, () => setEditingRole(null)); // Actualizar rol
        setNewRole({ nombre_rol: '' });
        setCreateMode(false);
    };

    const handleDeleteRole = async (id_rol) => {
        try {
            await deleteRoleHandler(id_rol); // Eliminar el rol
            loadRoles(setRoles); // Recargar roles después de la eliminación
        } catch (error) {
            setErrorMessage('Error eliminando rol');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Lista de Roles</h1>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID Rol</th>
                                <th>Nombre Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map(role => (
                                <tr key={role.id_rol}>
                                    <td>{role.id_rol}</td>
                                    <td>{role.nombre_rol}</td>
                                    <td>
                                        <button onClick={() => handleEditRole(role)}>Editar</button>
                                        <button onClick={() => handleDeleteRole(role.id_rol)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className="create-button" onClick={() => setCreateMode(!createMode)}>
                    {createMode ? 'Cancelar' : 'Crear Rol'}
                </button>
                {(createMode && !editingRole) && (
                    <form className="create-form" onSubmit={handleCreateRole}>
                        <h2>Crear Rol</h2>
                        <div className="form-group">
                            <label>Nombre Rol</label>
                            <input
                                type="text"
                                name="nombre_rol"
                                value={newRole.nombre_rol}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-buttons">
                            <button type="submit">Crear Rol</button>
                        </div>
                    </form>
                )}
                {(createMode && editingRole) && (
                    <form className="create-form" onSubmit={handleUpdateRole}>
                        <h2>Actualizar Rol</h2>
                        <div className="form-group">
                            <label>Nombre Rol</label>
                            <input
                                type="text"
                                name="nombre_rol"
                                value={newRole.nombre_rol}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-buttons">
                            <button type="submit">Actualizar Rol</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default RolPage;
