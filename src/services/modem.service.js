const modemRepository = require("../repositories/modem.repository");
const { AppError } = require("../utils/AppError");

class ModemService {
  async getAllModems(query) {
    return await modemRepository.findAll(query);
  }

  async getModemById(modemId) {
    const modem = await modemRepository.findById(modem);
    if (!modem) {
      throw new AppError("Modem not found", 404);
    }
    return modem;
  }

  async createModem(modemData) {
    return await modemRepository.create(modemData);
  }

  async updateModem(modemId, modemData) {
    const modem = await modemRepository.findById(modemId);
    if (!modem) {
      throw new AppError("Modem not found", 404);
    }

    return await modemRepository.update(modemId, modemData);
  }

  async deleteModem(modemId) {
    const deleted = await modemRepository.delete(modemId);
    if (!deleted) {
      throw new AppError("Modem not found", 404);
    }
    return true;
  }
}

module.exports = new ModemService();
