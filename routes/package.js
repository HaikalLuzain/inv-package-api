const express = require("express");
const Router = express();
const PackageModel = require("../models/Package");
const { packageValidation, validateError } = require("../utils/validator");
const uuid = require("uuid");
const objectId = require("../utils/objectIdGenerator");

Router.get("/", async (req, res) => {
  try {
    const packages = await PackageModel.find();

    return res.status(200).json({ packages: packages });
  } catch (error) {
    return res.status(400).json({
      message: "Error",
    });
  }
});

Router.get("/:id", async (req, res) => {
  try {
    const data = await PackageModel.findOne({
      _id: req.params.id,
    });

    return res.status(200).json({ package: data });
  } catch (error) {
    return res.status(400).json({
      message: "Error",
    });
  }
});

Router.post("/", async (req, res) => {
  try {
    try {
      await packageValidation(req.body, req.method);
    } catch (error) {
      return validateError(error, res);
    }

    const {
      _id,
      customer_name,
      customer_code,
      transaction_amount,
      transaction_discount,
      transaction_additional_field,
      transaction_payment_type,
      transaction_state,
      transaction_code,
      transaction_order,
      organization_id,
      transaction_payment_type_name,
      transaction_cash_amount,
      transaction_cash_change,
      customer_attribute,
      custom_field,
      currentLocation,
    } = req.body;

    const transaction_id = uuid.v4();
    const connote_id = uuid.v4();
    const location_id = objectId();

    let { connote, origin_data, destination_data, koli_data } = req.body;
    connote._id = connote_id;
    connote.connote_id = connote_id;
    connote.transaction_id = transaction_id;
    connote.location_id = location_id;

    origin_data.location_id = location_id;
    destination_data.location_id = location_id;

    if (koli_data.length) {
      koli_data.map((item) => {
        const _id = uuid.v4();

        item._id = _id;
        item.koli_id = _id;
        item.connote_id = connote_id;
      });
    }

    const data = await PackageModel.create({
      _id,
      transaction_id,
      customer_name,
      customer_code,
      transaction_amount,
      transaction_discount,
      transaction_additional_field,
      transaction_payment_type,
      transaction_state,
      transaction_code,
      transaction_order,
      location_id,
      organization_id,
      transaction_payment_type_name,
      transaction_cash_amount,
      transaction_cash_change,
      customer_attribute,
      connote,
      connote_id,
      origin_data,
      destination_data,
      koli_data,
      custom_field,
      currentLocation,
    });

    return res.status(200).json({
      message: "Data stored succesfully", package: data
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error",
    });
  }
});

Router.put("/:id", async (req, res) => {
  try {
    try {
      await packageValidation(req.body, req.method);
    } catch (error) {
      return validateError(error, res);
    }

    const {
      transaction_id,
      customer_name,
      customer_code,
      transaction_amount,
      transaction_discount,
      transaction_additional_field,
      transaction_payment_type,
      transaction_state,
      transaction_code,
      transaction_order,
      location_id,
      organization_id,
      transaction_payment_type_name,
      transaction_cash_amount,
      transaction_cash_change,
      customer_attribute,
      connote,
      connote_id,
      origin_data,
      destination_data,
      koli_data,
      custom_field,
      currentLocation,
    } = req.body;

    if (koli_data.length) {
      koli_data.map((item) => {
        if (!item._id) {
          const _id = uuid.v4();

          item._id = _id;
          item.koli_id = _id;
          item.connote_id = connote_id;
        }
      });
    }

    const data = await PackageModel.findOne({
      _id: req.params.id,
    });

    if (!data)
      return res.status(404).json({ message: "Package not found!" });

    await data.updateOne({
      transaction_id,
      customer_name,
      customer_code,
      transaction_amount,
      transaction_discount,
      transaction_additional_field,
      transaction_payment_type,
      transaction_state,
      transaction_code,
      transaction_order,
      location_id,
      organization_id,
      transaction_payment_type_name,
      transaction_cash_amount,
      transaction_cash_change,
      customer_attribute,
      connote,
      connote_id,
      origin_data,
      destination_data,
      koli_data,
      custom_field,
      currentLocation,
    });

    return res.status(200).json({
      message: "Updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error",
    });
  }
});

Router.patch("/:id", async (req, res) => {
  try {
    const data = req.body;

    try {
      await packageValidation(req.body, req.method);
    } catch (error) {
      return validateError(error, res);
    }

    const pkg = await PackageModel.findOne({
      _id: req.params.id,
    });

    if (!pkg)
      return res.status(404).json({ message: "Package not found!" });

    await pkg.updateOne({
      $set: data,
    });

    return res.status(200).json({
      message: "Updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error",
    });
  }
});

Router.delete("/:id", async (req, res) => {
  try {
    const pkg = await PackageModel.findOneAndDelete({
      _id: req.params.id,
    });

    if (!pkg)
      return res.status(404).json({ message: "Package not found!" });

    return res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error",
    });
  }
});

module.exports = Router;
