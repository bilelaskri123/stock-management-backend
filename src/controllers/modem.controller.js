const modemService = require("../services/modem.service");

class ModemController {
  async getAll(req, res, next) {
    try {
      const { page, limit, search } = req.query;
      const modems = await modemService.getAllModems({
        page,
        limit,
        search,
      });
      res.status(200).json({ success: true, modems });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const modemId = req.params.id;
      const modem = await modemService.getModemById(modemId);
      res.status(200).json({ success: true, modem });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { success, error, data } = createModemSchema.safeParse(req.body);
      if (!success) {
        const message = `${error.issues[0].path[0]} ${error.issues[0].message}`;
        return res.status(400).json({ success: false, error: message });
      }
      const newModem = await modemService.createModem(data);
      res.status(201).json({ success: true, modem: newModem });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const modemId = req.params.id;
      const { success, error, data } = updateModemSchema.safeParse(req.body);
      if (!success) {
        const message = `${error.issues[0].path[0]} ${error.issues[0].message}`;
        return res.status(400).json({ success: false, error: message });
      }
      const updatedModem = await modemService.updateModem(modemId, data);
      res.status(200).json({ success: true, modem: updatedModem });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const modemId = req.params.id;
      await modemService.deleteModem(modemId);
      res
        .status(200)
        .json({ success: true, message: "Modem deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ModemController();
