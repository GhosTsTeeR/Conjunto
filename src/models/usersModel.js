'use strict'
const info = require('../database');
const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: 'ghoststeer',
    api_key: '486865968183475',
    api_secret: 'DavS6buaq-ZIepZ_X3eNmXBRmA0'
});

module.exports = function() {
    //informacion Personal del usuario
    async function listInfoUser(req) {
        let query = `SELECT  t_p.num_propiedad AS casa, t_p.fk_username AS username, t_p.nom_paterno, t_p.nom_materno, t_p.ape_paterno, t_p.ape_materno, t_p.nickname, t_p.nickname,  t_p.cedula, t_p.img_perfil, t_p.img_portada, t_p.img
        FROM  tbl_propiedad t_p, tbl_users t_u
        WHERE t_p.fk_username=t_u.username AND fk_username= "milton-propietario"`;

        const data = await info.query(query)
        return data
    }
    

    // Informacion PP
    async function listInfoPP(req) {
        let query = `SELECT t_i.idInformacion, t_p.fk_username, t_i.titulo, t_i.texto, t_i.idImg, t_i.descripcion_img, t_i.titulo_img, t_i.img_url, t_i.fk_num_propiedad AS casa, t_p.nom_paterno AS nombre, t_p.ape_paterno AS apellido, t_i.creacion, t_p.nickname
        FROM tbl_informacion t_i, tbl_grupo t_g, tbl_propiedad t_p
        WHERE t_i.fk_idGrupo=t_g.idGrupo AND t_i.fk_num_propiedad=t_p.idPropiedad AND fk_idGrupo= 1 `;

        const data = await info.query(query)
        return data
    }
    async function addImgPP(req, res){
        var re = req.body.titulo;
        console.log(re);
        console.log(req.file);
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        const newPhotho = ({
        img_url: result.url,
        idImg: result.public_id
    });
    console.log(newPhotho);
    
        await info.query('INSERT INTO tbl_informacion set ? ', [req.body]);
        await info.query('UPDATE tbl_informacion SET ? WHERE titulo = ?', [newPhotho, re]);
    }
    async function deleteImgPP(req,  res){
        const {idInformacion} = req.params;
        await info.query('DELETE FROM tbl_informacion WHERE idInformacion = ?', [idInformacion]);
    }

    async function modifyImgPP(req,  res){
        const {idInformacion} = req.params;
        console.log(req.file)
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        const newPhotho = ({
        img_url: result.url,
        idImg: result.public_id
    });
    console.log(newPhotho);
    
    await info.query('UPDATE tbl_informacion SET ? WHERE idInformacion = ?', [req.body, idInformacion]);
    await info.query('UPDATE tbl_informacion SET ? WHERE idInformacion = ?', [newPhotho, idInformacion]);
    }
    // Ventas
    async function listSaleI(req) {
        let query = `SELECT t_v.idVenta, t_p.nom_paterno, t_p.nom_materno, t_p.ape_paterno, t_p.ape_materno,t_p.cedula, t_p.celular, t_p.num_propiedad, t_u.username, t_p.nickname, t_u.correo
        FROM tbl_ventas t_v, tbl_propiedad t_p, tbl_users t_u
        WHERE t_v.fk_user_username=t_u.username AND t_v.fk_num_propiedad=t_p.idPropiedad`;

        const data = await info.query(query)
        return data
    }
    async function listSale(req) {
        let query = `SELECT t_v.idVenta, t_p.nom_paterno, t_p.nom_materno, t_p.ape_paterno, t_p.ape_materno,t_p.cedula, t_p.celular, t_p.num_propiedad, t_u.username, t_p.nickname, t_u.correo
        FROM tbl_ventas t_v, tbl_propiedad t_p, tbl_users t_u
        WHERE t_v.fk_user_username=t_u.username `;

        const data = await info.query(query)
        return data
    }
    async function addSale(req, res){
        await info.query('INSERT INTO tbl_ventas set ?', [req.body]);
    }
    async function deleteSaleI(req,  res){
        const {idVenta} = req.params;
        await info.query('DELETE FROM tbl_ventas WHERE idVenta = ?', [idVenta]);
    }
    // Mensajes
    async function listChat(req) {
        let query = `SELECT t_c.idMensaje, t_c.mensaje, t_u.username, t_c.receptor, t_c.creacion 
        FROM tbl_chat t_c, tbl_users t_u
        WHERE t_c.fk_username=t_u.username AND fk_username= "milton-propietario"
        ORDER BY idMensaje ASC`;

        const data = await info.query(query)
        return data
    }
    async function addMessage(req, res){
        await info.query('INSERT INTO tbl_chat set ?', [req.body]);
    }

    // Informacion de Administracion a propietarios
    async function listInfoAP(req) {
        let query = `SELECT t_i.titulo, t_i.texto, t_i.img, t_i.creacion, t_g.grupo
        FROM tbl_informacion t_i, tbl_grupo t_g, tbl_propiedad t_p
        WHERE t_i.fk_idGrupo=t_g.idGrupo AND fk_idGrupo= 2 AND fk_idGrupo= 5`;

        const data = await info.query(query)
        return data
    }

    // Informacion de administradors a miembros de seguridad
    async function listInfoAS(req) {
        let query = `SELECT t_i.titulo, t_i.texto, t_i.img, t_i.creacion, t_g.grupo
        FROM tbl_informacion t_i, tbl_grupo t_g, tbl_propiedad t_p
        WHERE t_i.fk_idGrupo=t_g.idGrupo AND fk_idGrupo= 3 AND fk_idGrupo= 5`;

        const data = await info.query(query)
        return data
    }

    //informacion de administradores a foraneos del condominio
    async function listInfoAF(req) {
        let query = `SELECT t_i.titulo, t_i.texto, t_i.img, t_i.creacion, t_g.grupo
        FROM tbl_informacion t_i, tbl_grupo t_g, tbl_propiedad t_p
        WHERE t_i.fk_idGrupo=t_g.idGrupo AND fk_idGrupo= 4`;

        const data = await info.query(query)
        return data
    }

    //Quejas y reclamos
    async function listClaims(req) {
        let query = ' SELECT * FROM tbl_quejas';
        const data = await info.query(query)
        return data
    }
    // Permisos
    async function lsitPermisosSeguridad(req) {
        let query = `SELECT t_p_s.idPermiso, t_pr.num_propiedad, t_p_s.priNombre, t_p_s.segNombre, t_p_s.apellidoPat, t_p_s.apellidoMat, t_p_s.numDocumento, t_p.parentezco, t_v.vehiculo, t_p_s.placa
        FROM tbl_permisos_seguridad t_p_s, tbl_vehiculo t_v, tbl_parentezco t_p, tbl_propiedad t_pr
        WHERE t_p_s.fk_idPropiedad = t_pr.num_propiedad AND t_p_s.fk_idParentezco=t_p.idParentezco AND t_p_s.fk_idTipoVehiculo=t_v.idVehiculo AND fk_idPropiedad=1`;
        const data = await info.query(query)
        return data
    }
    async function lsitPermisosPropietario(req) {
        let query = `SELECT t_p_p.idPermiso, t_pr.num_propiedad, t_p_p.priNombre, t_p_p.segNombre, t_p_p.apellidoPat, t_p_p.apellidoMat, t_p_p.numDocumento, t_p.parentezco, t_v.vehiculo, t_p_p.placa, t_p_p.placa,t_e_p.estado,t_be.betar
        FROM tbl_permisos_propietario t_p_p, tbl_vehiculo t_v, tbl_parentezco t_p, tbl_estado_permiso t_e_p, tbl_betar t_be, tbl_propiedad t_pr
        WHERE t_p_p.fk_idPropiedad = t_pr.num_propiedad AND t_p_p.fk_idParentezco=t_p.idParentezco AND t_p_p.fk_idTipoVehiculo=t_v.idVehiculo AND t_p_p.fk_idEstado=t_e_p.idEstado AND t_p_p.fk_idBetar=t_be.idBetar AND num_propiedad=1`;
        const data = await info.query(query)
        return data
    }
    async function addPermisos(req, res){
        await info.query('INSERT INTO tbl_permisos_users set ?', [req.body]);
    }
    async function deletePermisos(req,  res){
        const {tarjeta} = req.params;
        await info.query('DELETE FROM tbl_permisos_users WHERE idPermiso = ?', [tarjeta]);
    }

    async function modifyPermisos(req,  res){
        const {tarjeta} = req.params;
        await info.query('UPDATE tbl_permisos_users SET ? WHERE idPermiso = ?', [req.body, tarjeta]);
    }
    return {
        //informacion del usuario
        listInfoUser,
        //informacion 
        listInfoPP,
        addImgPP,
        deleteImgPP,
        modifyImgPP,
        listInfoAP,
        listInfoAS,
        listInfoAF,
        //ventas de casas
        listSaleI,
        listSale,
        addSale,
        deleteSaleI,
        // chat
        listChat,
        addMessage,
        //permisos
        lsitPermisosSeguridad,
        lsitPermisosPropietario,
        deletePermisos,
        modifyPermisos,
        //ventas de casas
        listClaims
        }
}