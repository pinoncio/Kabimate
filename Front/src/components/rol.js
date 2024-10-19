import { getRoles, createRol, updateRol, deleteRol } from '../services/rol';

// Función para cargar roles
export const loadRoles = async (setRoles) => {
    try {
        const response = await getRoles();
        // Asegúrate de que los datos tengan las propiedades en minúsculas
        const roles = response.data.map(role => ({
            id_rol: role.ID_ROL,
            nombre_rol: role.NOMBRE_ROL,
            // Puedes agregar más propiedades aquí si es necesario
        }));
        setRoles(roles);
    } catch (error) {
        console.error('Error fetching roles:', error.response ? error.response.data : error.message);
    }
};

// Función para manejar la creación de un nuevo rol
export const createRoleHandler = async (newRole, setRoles, setCreateMode) => {
    try {
        await createRol(newRole); // Cambié aquí a createRol
        const response = await getRoles();
        const roles = response.data.map(role => ({
            id_rol: role.ID_ROL,
            nombre_rol: role.NOMBRE_ROL,
        }));
        setRoles(roles);
        setCreateMode(false);
    } catch (error) {
        console.error('Error creating role:', error.response ? error.response.data : error.message);
    }
};

// Función para manejar la actualización de un rol
export const updateRoleHandler = async (editedRole, loadRoles, setEditMode) => {
    try {
        await updateRol(editedRole.id_rol, editedRole); // Cambié aquí a updateRol
        loadRoles();
        setEditMode(false);
    } catch (error) {
        console.error('Error updating role:', error.response ? error.response.data : error.message);
    }
};

// Función para manejar la eliminación de un rol
export const deleteRoleHandler = async (id_rol) => {
    try {
        await deleteRol(id_rol); // Cambié aquí a deleteRol
        // Si tienes que volver a cargar los roles después de eliminar, asegúrate de hacerlo aquí
        const response = await getRoles();
        return response.data; // Retorna los nuevos roles si es necesario
    } catch (error) {
        console.error('Error deleting role:', error.response ? error.response.data : error.message);
        throw error; // Asegúrate de propagar el error para manejarlo adecuadamente
    }
};
