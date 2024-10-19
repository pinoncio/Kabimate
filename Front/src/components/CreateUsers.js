import { getUsers, deleteUser, updateUser, CreateUser } from '../services/user';
import { getRoles } from '../services/rol';
import { getInstituciones } from '../services/institucion';

export const loadUsers = async (setUsers) => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  export const loadRoles = async (setRoles) => {
    try {
      const response = await getRoles();
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error.response ? error.response.data : error.message);
    }
  };
  
  export const loadInstitutions = async (setInstitutions) => {
    try {
      const response = await getInstituciones();
      setInstitutions(response.data);
    } catch (error) {
      console.error('Error fetching instituciones:', error.response ? error.response.data : error.message);
    }
  };
  
  export const deleteUserHandler = async (id_usuario, loadUsers) => {
    try {
      await deleteUser(id_usuario);
      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  export const updateUserHandler = async (editedUser, loadUsers, setEditMode) => {
    try {
      await updateUser(editedUser.id_usuario, editedUser);
      loadUsers();
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user:', error.response ? error.response.data : error.message);
    }
  };
  
  export const createUser = async (newUser, loadUsers, setCreateMode) => {
    try {
      await CreateUser(newUser);
      loadUsers();
      setCreateMode(false);
    } catch (error) {
      console.error('Error creating user:', error.response ? error.response.data : error.message);
    }
  };