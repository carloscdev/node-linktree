const boom = require('@hapi/boom');
const { signToken, verifyToken } = require('../utils/jwt.util');

const UserService = require('../services/user.service');
const service = new UserService();

const { sendMail } = require('../utils/mail.util');

class AuthService {
  async userToken(user) {
    const { id: sub, email, role } = user;
    const payload = {
      sub,
      email,
      role,
    };
    const token = signToken(payload);
    return {
      user,
      token,
    };
  }

  async recoveryPassword(data) {
    const { email } = data;
    const user = await service.findByEmail(email);
    if (!user || !user.isActive)
      throw boom.unauthorized('No tienes permisos');

    const payload = { sub: user.id, email };
    const token = signToken(payload, '15min');
    const link = `http://myfrontend.com/recovery?token=${token}`;

    await service.updateRecoveryToken(user.id, token);

    const configMail = {
      to: email,
      subject: 'Recuperar Contraseña',
      text: 'Recuperar Contraseña',
      html: 'Ingresa a este link para recuperar tu contraseña: ' + link,
    }

    sendMail(configMail).catch(error => console.log(error));

    return {
      statusCode: 200,
      message: 'Se envió un token a tu correo',
    }
  }

  async updateRecoveryPassword(data) {
    try {
      const payload = verifyToken(data.token);
      const user = await service.findOne(payload.sub);

      if (user.recoveryToken !== data.token) throw boom.unauthorized('No tienes permisos');
      const response = await service.updatePassword(user.id, {
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      return response;
    } catch (error) {
      throw boom.unauthorized('No tienes permisos');
    }
  }
}

module.exports = AuthService;
