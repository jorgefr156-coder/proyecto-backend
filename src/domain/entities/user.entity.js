export default class UserEntity {
    constructor({ id, email, password, role }) {
        this.id = id;
        this.email = email;
        this.password = password;
        // Si no nos pasan un rol, por defecto le asignamos 'user'
        this.role = role || 'user'; 
    }
}